const mongooseUser = require('../models/modeleUser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwtUtil = require('../utils/jwtUtil');


var express = require('express');
    app = express();
app.use(express.json());


function sanitizeField(field) {
    return validator.escape(field);
}

function generateUserId(email) {
    const JWT_SIGN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const hash = crypto.createHmac('sha256', JWT_SIGN_SECRET)
    .update(email)
    .digest('hex');
    return hash;
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
        const {
            nom,
            prenom,
            email,
            password,
            appKey,
        } = req.body;

        let Tempnom = sanitizeField(nom);
        let Tempprenom = sanitizeField(prenom);
        let Tempemail = sanitizeField(email);
        let Temppassword = sanitizeField(password);

        if (nom != Tempnom || prenom != Tempprenom || email != Tempemail || password != Temppassword) {
            console.log("Champs invalide");
            return res.status(400).send({ message: "Champs invalide. Veuillez vérifier les caractère spéciaux et veuillez réesayer !" });
        }
        // Validate user input
        if (
            !(
                nom &&
                prenom &&
                email &&
                appKey &&
                password
            )
        ) {
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

        var newUser = {
            userId: generateUserId(email),
            nom: nom,
            prenom: prenom,
            type: "Eleve",
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            etatSondage: "Vide",
            Questionnaire: {
                monProgrammeEtudes: [],
                monChoixProgramme: [],
                moyensPourReussir: [],
            },
        };

        //Vérification du l'usager existe déjà
        mongooseUser
            .findOne({ email: email.toLowerCase() })
            .then((users) => {
                if (users) {
                    return res
                        .status(409)
                        .send({ message: "Erreur lors de la création de l'usager. Veuillez reesayer" });
                } else {
                    //On peut donc ajouter le nouvel usager
                    mongooseUser
                        .create(newUser)
                        .then((result) => {
                            console.log("Ajout d'un nouvel usager reussi");
                            return res.status(201).json(newUser);
                        })
                        .catch((err) => {
                            console.log("Erreur dans l'ajout d'un nouveau usager" + err); // existe deja
                            return res
                                .status(409)
                                .send({ message: "Erreur lors de la création de l'usager. Veuillez reesayer" });
                        });
                }
            })
            .catch((err) => {
                return res
                    .status(409)
                    .send({ message: "Erreur lors de la création de l'usager. Veuillez reesayer" }); // existe deja
            });
    } catch (err) {
        console.log(err);
    }
};

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log(email +  " + " + password);

        if (!(email && password)) {
            return res.status(400).send({ message: "Tout les champs sont requis" });
        }

        let Tempemail = sanitizeField(email);
        let TempPassword = sanitizeField(password);

        if (email != Tempemail || password != TempPassword) {
            console.log("Champs invalide");
            return res.status(400).send({ message: "Champs invalide. Veuillez vérifier les caractère spéciaux et veuillez réesayer !" });
        }

        const user = await mongooseUser.findOne({ email :email.toLowerCase() });

        if (user && (await bcrypt.compare(password, user.password))) {
            const bearerToken = jwtUtil.generateAccessToken(user.email);
            res.json({ bearerToken });
        } else {
            res.status(400).send({ message: "Courriel ou mot de passe invalide" });
        }
    } catch (err) {
        console.log(err);
    }
};