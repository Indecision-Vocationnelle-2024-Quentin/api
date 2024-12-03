const TypeQuestion = require('../models/TypeQuestion');
const Question = require('../models/Question');
const Facteur = require('../models/Facteur');
const Utilisateur = require('../models/Utilisateur');
const QuestionUtilisateur = require('../models/QuestionUtilisateur');

var jwt = require("jsonwebtoken");


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
                questionParFacteur[Lettre] = { Lettre, Nom, Description, questions: [] };
            }

            questionParFacteur[Lettre].questions.push({
                id: question.IdQuestion,
                question: question.Question
            });
        });

        const listeQuestionVraiOuFaux = Object.values(questionParFacteur);

        res.status(200).json({ facteurs: listeQuestionVraiOuFaux });

    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer." });
    }
};


exports.getQuestionsVraiFauxParLettreFacteur = async function (req, res) {
    try {
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
                    where: { Lettre: req.body.lettreFacteur },
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
                questionDuFacteur[Lettre] = { Lettre, Nom, Description, question: [] };
            }

            const [questionUtilisateur] = question.QuestionUtilisateurs || [];

            questionDuFacteur[Lettre].question.push({
                idQuestion: question.IdQuestion,
                question: question.Question,
                reponse: questionUtilisateur?.Reponse || null
            });
        });

        const listeDesQuestionsVraiFauxDuFacteur = Object.values(questionDuFacteur);

        res.json({ ListeDesQuestionsVraiFauxDuFacteur: listeDesQuestionsVraiFauxDuFacteur });


    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ erreur: "Nous remcontrons un probleme." })
    }
};

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

exports.obtenirResultat = async function (req, res) {

};