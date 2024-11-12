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

        res.json({ facteurs: listeQuestionVraiOuFaux });

    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer." });
    }
};


exports.getQuestionsVraiFauxParLettreFacteur = async function (req, res) {
    try {
        //Récupération du token et extraction de l'information
        const userToken = req.headers.authorization.split(' ')[1];
        console.log(userToken);
        const decodedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);
        const userEmail = decodedToken.email;
        console.log(userEmail);

        const utilisateur = await Utilisateur.findOne({ where: { Courriel: userEmail } });
        if (!utilisateur) 
        {
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
            where: { IdTypeQuestion: typeVraiOuFaux.IdTypeQuestion },
            include: [
                {
                    model: Facteur,
                    where: { Lettre: req.body.lettreFacteur },
                    required: true,
                    attributes: ['Lettre', 'Nom', 'Description']
                },
                {
                    model: Utilisateur,
                    required: false, //LEFT JOIN
                    where: { UtilisateurId: utilisateur.UtilisateurId },
                    through: { attributes: ['Reponse'] }  // Récupérez la réponse via l'attribut through
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

            questionDuFacteur[Lettre].question.push({
                idQuestion: question.IdQuestion,
                question: question.Question,
                reponse: question?.Reponse || null
            });
        });

        const listeDesQuestionsVraiFauxDuFacteur = Object.values(questionDuFacteur);

        res.json({ ListeDesQuestionsVraiFauxDuFacteur: listeDesQuestionsVraiFauxDuFacteur })


    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({ erreur: "Nous remcontrons un probleme." })
    }
};

// exports.test = async function(req,res){
//     const categorie = req.body.categorie;

//     let listeDesFacteurs = [];
//     listeDesFacteurs = await FacteurController.getFacteursParCategorie(categorie);
//     console.log(listeDesFacteurs);
//     return res.json({laCategorie : categorie});
//     Facteur.update
// };