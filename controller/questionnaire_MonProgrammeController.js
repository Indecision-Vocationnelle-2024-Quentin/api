const MonProgrammeEtude = require('../models/modeleQuestionnaire_monProgrammeEtudes');
const UserSchema = require('../models/modeleUser');
var jwt = require("jsonwebtoken");

var express = require('express');
    app = express();
app.use(express.json());


exports.getAllQuestions = async function (req, res) {
    console.log("questionnaire_MonProgramme/getAllQuestions");

    try {
        const questions = await MonProgrammeEtude.find({});
        res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getAllQuestionsByAnswer = async function (req, res) {
    console.log("questionnaire_MonProgramme/getAllQuestionsByAnswer");

    // récupérer reponseFacteur du corps de la requête
    const reponseFacteur = req.body.reponseFacteur;

    try {
        const questions = await MonProgrammeEtude.find({});
        const modifiedQuestions = questions.map((programme) => {
            const filteredQuestionProgrammeEtudes = programme.questionProgrammeEtudes.filter(qpe => 
                reponseFacteur.some(r => 
                    ((['I', 'S', 'M', 'O', 'C', 'T'].includes(r.type) && r.score >= 2) || 
                    (['A', 'E', 'X'].includes(r.type) && r.score >= 1)) && r.type === qpe.type
                )
            );
            programme.questionProgrammeEtudes = filteredQuestionProgrammeEtudes;
            return programme;
        });
        
        res.status(200).json(modifiedQuestions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getByType = function (req, res) {
    console.log("questionnaire_MonProgramme/getByType");
    const type = req.params.type;
    MonProgrammeEtude.find({})
        .then(questionnaires => {
            let questions = [];
            questionnaires.forEach(questionnaire => {
                questionnaire.questionProgrammeEtudes.forEach(programmeEtudes => {
                    if (programmeEtudes.type === type) {
                        programmeEtudes.questions.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // filtrer les resultats en ordre croissant de l'id
                        // https://stackoverflow.com/questions/23661115/sort-a-list-by-id-by-using-javascript
                        questions.push(...programmeEtudes.questions);
                    }
                });
            });
            res.status(200).json(questions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Server Error");
        });
};

exports.getReponseByType = async function (req, res) {
    console.log("questionnaire_MonProgramme/getReponseByType");
    const type = req.params.type;

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;
    const user = await UserSchema.findOne({ email: userEmail });

    try {
        let responses = [];
        user.Questionnaire.forEach(questionnaire => {
            questionnaire.monProgrammeEtudes.forEach(programmeEtudes => {
                if (programmeEtudes.type === type) {
                    responses.push({
                        id: programmeEtudes.id,
                        type: programmeEtudes.type,
                        reponse: programmeEtudes.reponse
                    });
                }
            });
        });
        res.status(200).json(responses);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.addQuestionToUser = async function (req, res) {
    console.log("questionnaire_MonProgramme/addQuestionToUser");
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    const user = await UserSchema.findOne({ email: userEmail });

    if (!user.Questionnaire) {
        user.Questionnaire = [{}];
    }
    if (!user.Questionnaire[0].monProgrammeEtudes) {
        user.Questionnaire[0].monProgrammeEtudes = [];
    }

    if (!req.body.reponse || req.body.reponse === null) {
        return res.status(400).json({ message: 'reponse est requis.' });
    }

    for (const question of req.body.reponse) {
        // Verifier si l'id existe dans la bd de question (ne pas ajouter de fausse questions)
        const questionExists = await MonProgrammeEtude.findOne({ "questionProgrammeEtudes.questions.id": question.id });
        if (!questionExists) {
            return res.status(404).json({ message: 'Question ' + question.id + ' non trouvée.' });
        }

        let existingQuestionIndex = user.Questionnaire[0].monProgrammeEtudes.findIndex(item => item.id === question.id);

        if (existingQuestionIndex !== -1) {
            // Si la question existe déjà, mettez à jour la réponse
            user.Questionnaire[0].monProgrammeEtudes[existingQuestionIndex].reponse = question.reponse;
        } else {
            // Si la question n'existe pas, ajoutez-la
            user.Questionnaire[0].monProgrammeEtudes.push(question);
        }
    }

    try {
        await user.save();
        res.status(200).send({ message: "Question(s) ajouté avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};