var express = require('express');
var jwt = require("jsonwebtoken");
const UserSchema = require('../models/modeleUser');
const MonChoixProgrammeSchema = require('../models/modeleQuestionnaire_monChoixProgramme');
app = express();
app.use(express.json());



exports.getAllQuestions = async function (req, res) {
    console.log("questionnaire_MonChoixProgramme/getAllQuestions");

    try {
        const questions = await MonChoixProgrammeSchema.find({});
        res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getByType = function (req, res) {
    console.log("questionnaire_MonChoixProgramme/getByType");
    const type = req.params.type;
    MonChoixProgrammeSchema.find({})
        .then(questionnaires => {
            let questions = [];
            questionnaires.forEach(questionnaire => {
                questionnaire.question.forEach(facteur => {
                    facteur.questions.forEach(questionItem => {
                        if (questionItem.type === type) {
                            questions.push(questionItem);
                        }
                    });
                });
            });
            res.status(200).json(questions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Server Error");
        });
};

exports.addQuestionToUser = function (req, res) {
    console.log("questionnaire_MonChoixProgramme/addQuestionToUser");
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    // verifier si la réponse est valide
    if (req.body.question.reponse !== 'vrai' && req.body.question.reponse !== 'faux') {
        return res.status(400).json({ message: 'Réponse invalide.' });
    }

    // recherchez l'utilisateur et lui ajoute la section question si elle n'existe pas
    UserSchema.findOne({ email: userEmail })
    .then(user => {
        if (!user.Questionnaire || !user.Questionnaire[0]) {
            user.Questionnaire = [{}];
        }
        let monChoixProgramme = user.Questionnaire[0].monChoixProgramme;
        if (!monChoixProgramme) {
            user.Questionnaire[0].monChoixProgramme = [{}];
            monChoixProgramme = user.Questionnaire[0].monChoixProgramme;
        }

        // Vérifiez si le type existe déjà dans la liste de question, sinon elle sera crée
        let typeExists = monChoixProgramme.find(item => item.type === req.body.question.type);

        // Si le type n'existe pas, créez-le
        if (!typeExists) {
            if (req.body.question.reponse === 'vrai') {
                typeExists = {
                    type: req.body.question.type,
                    reponsesPositives: [req.body.question],
                    reponsesNegatives: [],
                };
            }
            else {
                typeExists = {
                    type: req.body.question.type,
                    reponsesPositives: [],
                    reponsesNegatives: [req.body.question],
                };
            }
            monChoixProgramme.push(typeExists);
        }
        // Vérifiez si la question existe déjà
        let questionExists = typeExists.reponsesPositives.find(item => item.id === req.body.question.id) || typeExists.reponsesNegatives.find(item => item.id === req.body.question.id);
        
        // Si la question existe, modification de celle-ci
        if (questionExists) {
            // Si la réponse a changé, déplacez la question entre reponsesPositives et reponsesNegatives
            if ((questionExists.reponse === 'vrai' && req.body.question.reponse === 'faux') || (questionExists.reponse === 'faux' && req.body.question.reponse === 'vrai')) {
                if (req.body.question.reponse === 'vrai') {
                    typeExists.reponsesNegatives = typeExists.reponsesNegatives.filter(item => item.id !== req.body.question.id);
                    typeExists.reponsesPositives.push(req.body.question);
                } else {
                    typeExists.reponsesPositives = typeExists.reponsesPositives.filter(item => item.id !== req.body.question.id);
                    typeExists.reponsesNegatives.push(req.body.question);
                }
            } else {
                questionExists.reponse = req.body.question.reponse;
            }
        } else {
            // Sinon, ajoutez la question
            if (req.body.question.reponse === 'vrai') {
                typeExists.reponsesPositives.push(req.body.question);
            } else {
                typeExists.reponsesNegatives.push(req.body.question);
            }
        }
        return user.save();
    })
    .then(() => res.status(201).json({ message: 'Réponse ajouté avec succès !' }))
    .catch(err => {
        console.log(err);
        res.status(500).send("Server Error");
    });
};


exports.getReponseByType = function (req, res) {
    console.log("questionnaire_MonChoixProgramme/getReponseByType");
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    UserSchema.findOne({ email: userEmail })
    .then(user => {
        if (!user.Questionnaire) {
            user.Questionnaire = [{}];
        }
        let monChoixProgramme = user.Questionnaire[0].monChoixProgramme;
        if (!monChoixProgramme) {
            monChoixProgramme = [{}];
        }

        let typeExists = monChoixProgramme.find(item => item.type === req.params.type);

        if (!typeExists) {
            return res.status(404).json({ message: 'Type non trouvé.' });
        }

        if (typeExists.reponsesPositives) {
            typeExists.reponsesPositives.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // filtrer les resultats en ordre croissant de l'id
            // https://stackoverflow.com/questions/23661115/sort-a-list-by-id-by-using-javascript
        }

        res.status(200).json(typeExists);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Server Error");
    });
}

exports.verifyAllAnswer = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    UserSchema.findOne({ email: userEmail })
    .then(user => {
        if (!user.Questionnaire) {
            user.Questionnaire = [{}];
        }
        let monChoixProgramme = user.Questionnaire[0].monChoixProgramme;
        if (!monChoixProgramme) {
            monChoixProgramme = [{}];
        }

        let allAnswered = true;
        let listeQuestion = [];

        monChoixProgramme.forEach(typeExists => {
            let promise = MonChoixProgrammeSchema.aggregate([
                { $unwind: "$question" },
                { $unwind: "$question.questions" },
                { $match: { "question.questions.type": typeExists.type } },
                { $count: "totalQuestions" }
            ])
            .then(result => {
                let totalQuestions = result.length > 0 ? result[0].totalQuestions : 0;
                if (typeExists.reponsesPositives.length + typeExists.reponsesNegatives.length !== totalQuestions) {
                    allAnswered = false;
                }
            });
            listeQuestion.push(promise);
        });

        Promise.all(listeQuestion)
        .then(() => {
            res.status(200).json({ allAnswered });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Server Error");
    });
}

exports.getAllScoreReponses = function (req, res) {
    console.log("questionnaire_MonChoixProgramme/getAllScoreReponses");
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    UserSchema.findOne({ email: userEmail })
    .then(user => {
        if (!user.Questionnaire) {
            user.Questionnaire = [{}];
        }
        let monChoixProgramme = user.Questionnaire[0].monChoixProgramme;
        // Calculer le score pour chaque facteur
        const scores = monChoixProgramme.map(facteur => {
            const score = facteur.reponsesPositives.length;
            return { type: facteur.type, score };
        });

        res.status(200).json(scores);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Server Error");
    });
}