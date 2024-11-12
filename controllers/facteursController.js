const Facteur = require('../models/Facteur');
const Question = require('../models/Question');
const Action = require('../models/Action');
const Ressource = require('../models/Ressource');


exports.getFacteursParCategorie = async function (nomDeLaCategorie) {
    try {
        let listeFacteursParCategorie = [];

        // Recherche des facteurs en fonction de la catégorie
        if (nomDeLaCategorie === "questions") {
            listeFacteursParCategorie = await Facteur.findAll({
                attributes: ["IdFacteur", "Lettre", "Nom", "Description"],
                include: [{
                    model: Question,
                    required: true // Inner join pour s'assurer qu'il y a des résultats
                }]
            });
        } else if (nomDeLaCategorie === "actions") {
            listeFacteursParCategorie = await Facteur.findAll({
                attributes: ["IdFacteur", "Lettre", "Nom", "Description"],
                include: [{
                    model: Action,
                    required: true
                }]
            });
        } else if (nomDeLaCategorie === "ressources") {
            listeFacteursParCategorie = await Facteur.findAll({
                attributes: ["IdFacteur", "Lettre", "Nom", "Description"],
                include: [{
                    model: Ressource,
                    required: true
                }]

            });
        }
        else {
            throw new Error("Il y a un problème avec la catégorie");
        }
        return listeFacteursParCategorie;
    } catch (erreur) {
        throw erreur;
    }
};
