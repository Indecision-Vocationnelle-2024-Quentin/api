const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Directive = new Schema({
    titre : { type: String, required: true },
    objectifs : [String],
});

const question = new Schema({
    id : { type: String, required: true },
    enonce : { type: String, required: true },
 });

const QuestionProgrammeEtudes = new Schema({
    type : { type: String, required: true },
    id : { type: String, required: true },
    titre : { type: String, required: true },
    sousTitre : { type: String, required: true },
    questions : [question],

});

const MonProgrammeEtudesSchema = new Schema({
    titre : { type: String, required: true },
    directives : [Directive],
    piedPage : { type: String, required: true },
    questionProgrammeEtudes : [QuestionProgrammeEtudes],
});

module.exports = mongoose.model('Questionnaire_MonProgrammeEtudes', MonProgrammeEtudesSchema);