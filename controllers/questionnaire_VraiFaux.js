/**
 * @file        questionnaire_VraiFaux.js
 * @summary     Controlleur du formulaire vrai ou faux pour le choix de programme
 * 
 * @description Controlleur principale des questions, réponses, titre et description du formulaire vrai ou faux
 * 
 * @requires    TypeQuestion
 * @requires    Quentin
 * @requires    Facteur
 * @requires    Utilisateur
 * @requires    QuestionUtilisateur
 * @requires    Questionnaire
 * @requires    TypeQuestionnaire
 * @requires    jwt
 * 
 * @version     1.5
 * @created     10/10/2024
 * 
 * @updated     29/11/2024
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const TypeQuestion = require('../models/TypeQuestion');
const Question = require('../models/Question');
const Facteur = require('../models/Facteur');
const Utilisateur = require('../models/Utilisateur');
const QuestionUtilisateur = require('../models/QuestionUtilisateur');
const Questionnaire = require('../models/Questionnaire');
const TypeQuestionnaire = require('../models/TypeQuestionnaire');

var jwt = require("jsonwebtoken");

/**
 * @name    getQuestionsVraiFaux
 * 
 * @description Permet de checher dans la base de données les questions par facteurs, avec le détails du facteur
 * 
 * @param {*} res 
 * @returns JSON 
 * "facteurs": [
        {
            "Lettre": "I",
            "Nom": "...",
            "Description": "...",
            "Questions": [
                {
                    "Id": 1,
                    "Question": "..."
                },
                ...
            ]
        },
        ...
 */
exports.getQuestionsVraiFaux = async function (req, res) {

    try {
        const typeVraiOuFaux = await TypeQuestion.findOne({
            where: { Type: 'Vrai ou Faux' },
            attributes: ['IdTypeQuestion']
        });

        if (!typeVraiOuFaux) {
            return res.status(404).json({ error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer." });
        }
        //Récupération des questions avec le facteur lié
        const questionVraiOuFaux = await Question.findAll({
            where: { IdTypeQuestion: typeVraiOuFaux.IdTypeQuestion },
            include: [
                {
                    model: Facteur,
                    attributes: ['Lettre', 'Nom', 'Description']
                }
            ],
            attributes: ['IdQuestion', 'Question']
        });
        const questionParFacteur = {};
        questionVraiOuFaux.forEach(question => {
            const unFacteur = question.Facteur;
            const { Lettre, Nom, Description } = unFacteur
            //Groupement par lettre de facteur
            if (!questionParFacteur[Lettre]) {
                questionParFacteur[Lettre] = { Lettre, Nom, Description, Questions: [] };
            }

            questionParFacteur[Lettre].Questions.push({
                Id: question.IdQuestion,
                Question: question.Question
            });
        });

        const listeQuestionVraiOuFaux = Object.values(questionParFacteur);

        res.status(200).json({ facteurs: listeQuestionVraiOuFaux });

    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer." });
    }
};

//Méthode qui permet d'obtenir les détails d'un formulaire, comme le nom de ce formulaire, sa description ainsi que la liste de ces facteurs
exports.obtenirDetailsQuestionnaire = async function (req, res) {
    try {

        const categorieQuestionnaireVraiFaux = await TypeQuestionnaire.findOne({
            where: { Type: 'Facteurs indécision étudiant' },
            attributes: ['IdTypeQuestionnaire']
        });

        const questionnaireVraiFaux = await Questionnaire.findOne({
            where: { IdTypeQuestionnaire: categorieQuestionnaireVraiFaux.IdTypeQuestionnaire }
        });

        const { IdQuestionnaire, Titre, Description } = questionnaireVraiFaux;
        const detailsQuestionnaireVraiFaux = { IdQuestionnaire, Titre, Description, listeFacteur: [] };
        console.log(detailsQuestionnaireVraiFaux);
        const typeVraiOuFaux = await TypeQuestion.findOne({
            where: { Type: 'Vrai ou Faux' },
            attributes: ['IdTypeQuestion']
        });

        if (!typeVraiOuFaux) {
            return res.status(404).json({ error: "Nous rencontrons un problème lors de la récupération du questionnaire, veuillez reessayer." });
        }
        //Récupération des questions avec le facteur lié
        const listeDesFacteurs = await Facteur.findAll({
            attributes: ['Lettre'],
            include: [
                {
                    model: Question,
                    where: { IdTypeQuestion: typeVraiOuFaux.IdTypeQuestion },
                    attributes: [],
                    required: true
                }
            ]
        });
        console.log(listeDesFacteurs);
        listeDesFacteurs.forEach(facteur => {
            detailsQuestionnaireVraiFaux.listeFacteur.push({
                Lettre: facteur.Lettre
            });
        });
        const objet = Object.values(detailsQuestionnaireVraiFaux);
        res.status(200).json({ detailsQuestionnaireVraiFaux });
    }
    catch (erreur) {
        console.log(erreur);
        res.status(500).json({ Message: "Nous rencontrons un problème lors de la récupération du questionnaire, veuillez reessayer." });
    }
};

/**
 * @name    getQuestionsVraiFauxParLettreFacteur
 * 
 * @description Permet de checher dans la base de données les questions d'un facteur en particulier
 * 
 * @param {body.lettreFacteur, bearerToken} req
 * @param {404, 500, 200} res 
 * @returns JSON 
        {
            "Lettre": "I",
            "Nom": "...",
            "Description": "...",
            "Questions": [
                {
                    "Id": 1,
                    "Question": "..."
                },
                ...
 */
exports.getQuestionsVraiFauxParLettreFacteur = async function (req, res) {
    try {
        //Récupération du token et extraction de l'information
        const userToken = req.headers.authorization.split(' ')[1];

        const laLettre = req.body.lettreFacteur;

        const decodedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);

        const userEmail = decodedToken.email;

        const utilisateur = await Utilisateur.findOne({ where: { Courriel: userEmail } });
        if (!utilisateur) {
            return res.status(404).json({ error: "Nous rencontrons un problème." });
        }

        const typeVraiOuFaux = await TypeQuestion.findOne({
            where: { Type: 'Vrai ou Faux' },
            attributes: ['IdTypeQuestion']
        });
        if (!typeVraiOuFaux) {
            return res.status(404).json({
                error: "Nous rencontrons un problème lors de la récupération des questions par types, veuillez reessayer."
            });
        };

        const questionVraiOuFauxSelonFacteur = await Question.findAll({
            attributes: ['IdQuestion', 'Question'],
            where: {
                IdTypeQuestion: typeVraiOuFaux.IdTypeQuestion
            },
            include: [
                {
                    model: Facteur,
                    required: true,  // INNER JOIN
                    where: { Lettre: laLettre },
                    attributes: ['Lettre', 'Nom', 'Description']
                },
                {
                    model: QuestionUtilisateur,
                    required: false,  // LEFT JOIN
                    where: { IdUtilisateur: utilisateur.UtilisateurId },
                    attributes: ['Reponse']
                }
            ]
        });

        const questionDuFacteur = {};
        questionVraiOuFauxSelonFacteur.forEach(question => {
            const leFacteur = question.Facteur;
            const { Lettre, Nom, Description } = leFacteur;

            //Regroupement
            if (!questionDuFacteur[Lettre]) {
                questionDuFacteur[Lettre] = { Lettre, Nom, Description, Questions: [] };
            }

            const [questionUtilisateur] = question.QuestionUtilisateurs || [];

            questionDuFacteur[Lettre].Questions.push({
                IdQuestion: question.IdQuestion,
                Question: question.Question,
                Reponse: questionUtilisateur?.Reponse || null
            });
        });

        const listeDesQuestionsVraiFauxDuFacteur = Object.values(questionDuFacteur);

        res.json({ ListeDesQuestionsVraiFauxDuFacteur: listeDesQuestionsVraiFauxDuFacteur });


    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ erreur: "Nous remcontrons un probleme." })
    }
};

/**
 * @name    nouvelleReponseQuestionVraiFaux
 * 
 * @description Permet de changer la réponse d'une questions d'un utilisateur
 * 
 * @param {body.reponse, bearerToken} req 
 * @param {500, 404, 200} res 
 * @returns 
 */
exports.nouvelleReponseQuestionVraiFaux = async function (req, res) {
    try {
        const laNouvelleReponse = req.body.reponse;

        if (laNouvelleReponse != "Vrai" && laNouvelleReponse != "Faux") {
            return res.status(500).json({ erreur: "La valeur de la nouvelle reponse n'est pas conforme." })
        }
        //Récupération du token et extraction de l'information
        const userToken = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);

        const userEmail = decodedToken.email;

        const utilisateur = await Utilisateur.findOne({ where: { Courriel: userEmail } });
        if (!utilisateur) {
            return res.status(404).json({ error: "Nous rencontrons un problème." });
        }

        const typeVraiOuFaux = await TypeQuestion.findOne({
            where: { Type: 'Vrai ou Faux' },
            attributes: ['IdTypeQuestion']
        });
        if (!typeVraiOuFaux) {
            return res.status(404).json({ error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer." });
        }

        const question = await Question.findOne({
            where: {
                IdTypeQuestion: typeVraiOuFaux.IdTypeQuestion,
                IdQuestion: req.body.idQuestion
            }
        });
        if (!question) {
            return res.status(404).json({ error: "Question inéxistante ou incompatible." });
        }

        const [laReponse, created] = await QuestionUtilisateur.findOrCreate({
            where: {
                IdQuestion: req.body.idQuestion,
                IdUtilisateur: utilisateur.UtilisateurId
            },
            defaults: {
                Reponse: laNouvelleReponse
            }
        });
        if (!created) {
            laReponse.Reponse = laNouvelleReponse;
            await laReponse.save();
        }
        return res.status(200).json({
            message: created ? "Réponse enregistrée avec succès." : "Réponse mise à jour avec succès."
        });

    }
    catch (erreur) {
        res.status(500).json({ erreur: "Imposible d'enregistrer cette nouvelle reponse." })
    }
};

