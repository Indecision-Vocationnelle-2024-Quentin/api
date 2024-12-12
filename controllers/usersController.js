const Utilisateur = require('../models/Utilisateur');
const TypeAuthorisation = require('../models/TypeAuthorisation');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwtUtil');


var express = require('express');
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
            where: {Type:"Utilisateur"},
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
 * Méthode de purge de l'utilisateur conncté
 * 
 */
exports.purgeUser = async function (req, res) {
    const transactionPurgeEleve = await sequelize.transaction();
    try {
        //Création de la transaction en sequelize
        // Lien utilie:
        //https://sequelize.org/docs/v6/other-topics/transactions/

        //Récupération du token et extraction de l'information
        const userToken = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);
        const userEmail = decodedToken.email;

        //On trouve l'utilisateur dans la BDD et on en créé un objet Sequelize
        const utilisateurPurge = await Utilisateur.findOne({
             where: { Courriel: userEmail },
             },
             { transaction: transactionPurgeEleve }
            );
        if (!utilisateurPurge) {
            return res.status(404).json({ error: "Nous rencontrons un problème." });
        }

        //On détruit l'objet sequelize et sa corespondance dans la BDD, 
        //Donc suppression de l'utilisateur et des ses dépendances
        await utilisateurPurge.destroy({ transaction: transactionPurgeEleve });


        await transactionPurgeEleve.commit();//Execution manuelle de la transaction

        return res.status(200).send({ message: "Succès de la purge de l'élèves dans la base de données" });
    }
    catch (error) {
        // Annulation de la transaction en cas d'erreur
        await transactionPurgeEleve.rollback();
        
        let messageErreur = "Erreur lors de la purge";
    
        return res.status(500).send({ message: messageErreur });
    }
};