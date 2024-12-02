const Utilisateur = require('../models/Utilisateur');
/*Pour l'issue */
const TypeUtilisateur = require('../models/TypeUtilisateur');
const UtilisateurType = require('../models/UtilisateurType');
const QuestionUtilisateur = require('../models/QuestionUtilisateur');
const RessourceUtilisateur = require('../models/RessourceUtilisateur');
const ActionUtilisateur = require('../models/ActionUtilisateur');
/*Fin de l'issue */
const TypeAuthorisation = require('../models/TypeAuthorisation');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwtUtil');


var express = require('express');
const sequelize = require('../config/server');
app = express();
app.use(express.json());


function sanitizeField(field) {
    return validator.escape(field);
}

// methodes ...
exports.getAppToken = async function (req, res) {
    console.log("user/getAppToken");

    const email = req.body.email;
    const pass = req.body.pass;
    const user = { uname: email };

    // Validate user input
    if (!(email && pass)) {
        return res.status(400).send({ message: "All input is required" });
    }

    //Verifier si on l'authorise
    if (
        email != process.env.CREATION_EMAIL ||
        pass != process.env.CREATION_PASS
    )
        return res.status(401).send({ message: "Ask administrator for access" });

    const accessToken = jwtUtil.generateAppToken(user);
    res.status(200).json({ AppToken: accessToken });
};


exports.register = async function (req, res) {
    try {
        const { nom, prenom, email, password, appKey } = req.body;

        let Tempnom = sanitizeField(nom);
        let Tempprenom = sanitizeField(prenom);
        let Tempemail = sanitizeField(email);
        let Temppassword = sanitizeField(password);

        if (nom != Tempnom || prenom != Tempprenom || email != Tempemail || password != Temppassword) {
            console.log("Champs invalide");
            return res.status(400).send({ message: "Champs invalide. Veuillez vérifier les caractère spéciaux et veuillez réesayer !" });
        }
        // Validate user input
        if (!(nom && prenom && email && appKey && password)) {
            if (!nom) console.log("nom manquant");
            if (!prenom) console.log("prenom manquant");
            if (!email) console.log("email manquant");
            if (!password) console.log("mot de passe manquant");
            if (!appKey) console.log("appkey manquant");

            res.status(400).send({ message: "Tout les champs sont requis !" });
            return;
        }

        //Check si la demande à la bonne appKey
        if (!jwtUtil.verifyApplicationToken(appKey))
            return res.status(401).send({ message: "Invalid Application Token" });

        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Vérification si l'utilisateur existe déjà
        const utilisateurExiste = await Utilisateur.findOne({ where: { Courriel: email.toLowerCase() } });

        if (utilisateurExiste) {
            return res.status(409).send({ message: "Erreur lors de la création de l'usager. Veuillez reesayer." });
        }
        const AUTHORISATION_USER = await TypeAuthorisation.findOne({
            where: { Type: "Utilisateur" },
            attributes: ['IdTypeAuthorisation']
        });
        const nouvelUtilisateur = await Utilisateur.create({
            Nom: nom,
            Prenom: prenom,
            Courriel: email.toLowerCase(),
            MotDePasse: encryptedUserPassword,
            IdAuthorisation: AUTHORISATION_USER.IdTypeAuthorisation //Utilisateur
        });

        return res.status(201).json(nouvelUtilisateur);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Erreur lors de la création de l'utilisateur" });
    }
};

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log(email + " + " + password);

        if (!(email && password)) {
            return res.status(400).send({ message: "Tout les champs sont requis" });
        }

        let Tempemail = sanitizeField(email);
        let TempPassword = sanitizeField(password);

        if (email != Tempemail || password != TempPassword) {
            console.log("Champs invalide");
            return res.status(400).send({ message: "Champs invalide. Veuillez vérifier les caractère spéciaux et veuillez réesayer !" });
        }

        const utilisateur = await Utilisateur.findOne({ where: { Courriel: email.toLowerCase() } });
        if (utilisateur && (await bcrypt.compare(password, utilisateur.MotDePasse))) {
            const bearerToken = jwtUtil.generateAccessToken(utilisateur.Courriel);
            res.json({ bearerToken });
        } else {
            res.status(400).send({ message: "Courriel ou mot de passe invalide" });
        }
    } catch (err) {
        console.log(err);
    }
};


/**
 * Méthode de purge des utilisateurs de type élève
 * 
 * Cette méthode sera supprimer après la confirmation du formatif 
 * (close issue : Ajouter une fonctionnalité dans l'application : purge)
 */
exports.purgeUsers = async function (req, res) {
    const transactionPurgeEleve = await sequelize.transaction();
    try {
        //Création de la transaction en sequelize
        // Lien utilie:
        //https://sequelize.org/docs/v6/other-topics/transactions/

        // Récupéreration des Id des types Etudiant et Etudiante
        const typesEtudiant = await TypeUtilisateur.findAll({
            where: {
                Type: ['Etudiant', 'Etudiante']
            },
            attributes: ['IdTypeUtilisateur']
        },
            { transaction: transactionPurgeEleve });// { transaction: transactionPurgeEleve } permet d'integrer la fonction suequilize dans la transaction

        if (typesEtudiant.length === 0) {
            throw new Error();
        }

        const typeEtudiantIds = typesEtudiant.map(type => type.IdTypeUtilisateur);

        //Recherche des utilisateurs avec le type Etudiant ou Etudiante
        const elevesPourPurge = await Utilisateur.findAll({
            include: [{
                model: UtilisateurType,
                where: { IdTypeUtilisateur: typeEtudiantIds },
            }]
        },
            { transaction: transactionPurgeEleve });

        if (elevesPourPurge.length === 0) {
            throw new Error("Pas d'utilisateur");
        }
        const etudiantIds = elevesPourPurge.map(etudiant => etudiant.UtilisateurId);

        //Suppression des utilisateurs de la liste et des dépendences par effet cascade dans la base de données
        await Utilisateur.destroy({
            where: { UtilisateurId: etudiantIds }
        },
            { transaction: transactionPurgeEleve });

        await transactionPurgeEleve.commit();//Execution manuelle de la transaction

        return res.status(200).send({ message: "Succès de la purge des élèves dans la base de données" });
    }
    catch (error) {
        // Annulation de la transaction en cas d'erreur
        await transactionPurgeEleve.rollback();
        
        let messageErreur = (error.message === "Pas d'utilisateur") ? error.message : "Erreur lors de la purge";
    
        return res.status(500).send({ message: messageErreur });
    }
};