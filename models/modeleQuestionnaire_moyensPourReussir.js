const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Actions = new Schema({
    id : { type: String, required: true },
    type : { type: String, required: true },
    action : { type: String, required: true },
});

const Directive = new Schema({
    titre : { type: String, required: true },
    objectifs : [String],
});

const Ressources = new Schema({
    id : { type: String, required: true },
    type : { type: String, required: true },
    ressource : { type: String, required: true },
});

const QuestionMoyenReussite = new Schema({
    facteur : { type: String, required: true },
    titre : { type: String, required: true },
    actions : [Actions],
    ressources : [Ressources],
});

const MoyensPourReussirSchema = new Schema({
    titre : { type: String, required: true },
    directives : [Directive],
    sousTitre : { type: String, required: true },
    piedPage : { type: String, required: true },
    questionMoyenReussite : [QuestionMoyenReussite],
});

module.exports = mongoose.model('Questionnaire_MoyensPourReussir', MoyensPourReussirSchema);