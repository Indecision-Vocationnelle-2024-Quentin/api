const { TypeQuestion, Question, Facteur } = require('../models/models');

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
            attributes: ['Question']
        });

        const questionParFacteur = {};
        questionVraiOuFaux.forEach(question => {
            const unFacteur = question.Facteur;
            const { lettreFacteur, nomFacteur, descriptionFacteur } = unFacteur
            //Groupement par lettre de facteur
            if (!questionParFacteur[lettreFacteur]) {
                questionParFacteur[lettreFacteur] = { lettreFacteur, nomFacteur, descriptionFacteur, questions: [] };
            }

            questionParFacteur[lettreFacteur].questions.push({
                question: question.Question
            });
        });

        const listeQuestionVraiOuFaux = Object.values(questionParFacteur);

        res.json({facteurs : listeQuestionVraiOuFaux});

    } catch (erreur) {
        res.status(500).json({error: "Nous rencontrons un problème lors de la récupération des questions, veuillez reessayer."});
    }
};