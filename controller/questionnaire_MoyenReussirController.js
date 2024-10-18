const MoyenPourReussir = require('../models/modeleQuestionnaire_moyensPourReussir');
const UserSchema = require('../models/modeleUser');
var jwt = require("jsonwebtoken");

var express = require('express');
    app = express();
app.use(express.json());

exports.getAllQuestions = async function (req, res) {
    console.log("Questionnaire_MoyensPourReussir/getAllQuestions");

    try {
        const questions = await MoyenPourReussir.find({});
        res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getByType = function (req, res) {
    console.log("Questionnaire_MoyensPourReussir/getByType");
    const type = req.params.type;
    MoyenPourReussir.find({})
        .then(questionnaires => {
            let actions = [];
            let ressources = [];
            questionnaires.forEach(questionnaire => {
                questionnaire.questionMoyenReussite.forEach(moyenReussir => {
                    moyenReussir.actions.forEach(action => {
                        if (action.type === type) {
                            actions.push(action);
                        }
                    });
                    moyenReussir.ressources.forEach(ressource => {
                        if (ressource.type === type) {
                            ressources.push(ressource);
                        }
                    });
                });
            });
            res.status(200).json({actions, ressources});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Server Error");
        });
};


exports.addActionToUser = async function (req, res) {
    console.log("Questionnaire_MoyensPourReussir/addActionToUser");
    try {
        // Vérifiez si l'action est présent dans la requête
        if (!req.body.action) {
            return res.status(400).send('Action manquante dans la requête');
        }

        // Décoder le token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userEmail = decoded.email;
    
        const user = await UserSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

       // Ajouter l'action à l'utilisateur
        for (const questionnaire of user.Questionnaire) {
            for (const action of req.body.action) {
                // Rechercher le type correspondant dans moyensPourReussir
                let moyen = questionnaire.moyensPourReussir.find(m => m.type === action.type);

                // Si le type n'existe pas, créer une nouvelle entrée
                if (!moyen) {
                    moyen = {
                        type: action.type,
                        ressourcesReponses: [],
                        actionReponses: [action]
                    };
                    // Ajouter la nouvelle entrée à la liste moyensPourReussir
                    questionnaire.moyensPourReussir.push(moyen);
                } else {
                    // Vérifiez si l'action existe déjà
                    const actionExist = action.id && moyen.actionReponses.some(r => r.id === action.id);

                    // Si l'action existe déjà, supprimez-la
                    if (actionExist) {
                        moyen.actionReponses = moyen.actionReponses.filter(r => r.id !== action.id);
                    } else {
                        moyen.actionReponses.push(action);
                    }
                }
            }
        }

        // Sauvegarder l'utilisateur
        await user.save()

        res.status(200).send('Action ajoutée avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.addRessourceToUser = async function (req, res) {
    console.log("Questionnaire_MoyensPourReussir/addRessourceToUser");
    try {
        // Vérifiez si a ressource est présent dans la requête
        if (!req.body.ressource) {
            return res.status(400).send('Ressource manquante dans la requête');
        }

        // Décoder le token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userEmail = decoded.email;
    
        const user = await UserSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Ajouter la ressource à l'utilisateur
        let existingRessources = [];
        for (const questionnaire of user.Questionnaire) {
            for (const ressource of req.body.ressource) {
                // Rechercher le type correspondant dans moyensPourReussir
                let moyen = questionnaire.moyensPourReussir.find(m => m.type === ressource.type);
        
                // Si le type n'existe pas, créer une nouvelle entrée
                if (!moyen) {
                    moyen = {
                        type: ressource.type,
                        ressourcesReponses: [ressource], // Ajouter la ressource ici
                        actionResponses: []
                    };
        
                    // Ajouter la nouvelle entrée à la liste moyensPourReussir
                    questionnaire.moyensPourReussir.push(moyen);
                } else {
                    // Vérifiez si la ressource existe déjà
                    const ressourceExists = ressource.id && moyen.ressourcesReponses.some(r => r.id === ressource.id);
        
                    // Si la ressource existe déjà, supprimez-la
                    if (ressourceExists) {
                        moyen.ressourcesReponses = moyen.ressourcesReponses.filter(r => r.id !== ressource.id);
                    } else {
                        moyen.ressourcesReponses.push(ressource);
                    }
                }
            }
        }

        // Sauvegarder l'utilisateur
        await user.save()

        res.status(200).send('Ressource modifié avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getReponseRessourceActionFromUser = async function (req, res) {
    console.log("Questionnaire_MoyensPourReussir/getReponseRessourceActionFromUser");
    try {
        // Décoder le token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userEmail = decoded.email;
    
        const user = await UserSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        let actions = [];
        let ressources = [];
        for (const questionnaire of user.Questionnaire) {
            for (const moyen of questionnaire.moyensPourReussir) {
                actions = actions.concat(moyen.actionReponses);
                ressources = ressources.concat(moyen.ressourcesReponses);
            }
        }

        res.status(200).json({actions, ressources});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}