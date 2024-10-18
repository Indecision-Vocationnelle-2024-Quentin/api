const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const { Schema } = mongoose;

const ProgrammeEtudesSchema = new Schema({
    id: String,
    type: String,
    reponse : String,
});

const ReponseSchema = new Schema({
    id: String,
    type: String,
    reponse: String
});

const ActionReponseSchema = new Schema({
    id: String,
    type: String,
    action: String
});

const RessourceReponseSchema = new Schema({
    id: String,
    type: String,
    ressource: String
});

const ChoixProgrammeSchema = new Schema({
   type: String,
   reponsesPositives: [ReponseSchema],
   reponsesNegatives: [ReponseSchema],
});

const moyensPourReussirSchema = new Schema({
    type: String,
    actionReponses: [ActionReponseSchema],
    ressourcesReponses : [RessourceReponseSchema],
});

const QuestionnaireSchema = new Schema({
    monProgrammeEtudes: [ProgrammeEtudesSchema],
    monChoixProgramme: [ChoixProgrammeSchema],
    moyensPourReussir: [moyensPourReussirSchema], 
});

const UserSchema = new Schema({
    userId: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    etatSondage: { type: String, required: true },
    Questionnaire: [QuestionnaireSchema]
});

module.exports = mongoose.model('User', UserSchema);