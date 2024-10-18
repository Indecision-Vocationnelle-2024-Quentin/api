const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Directive = new Schema({
    titre : { type: String, required: true },
    objectifs : [String],
    but : { type: String, required: true },
});

const QuestionItem = new Schema({
   id : { type: String, required: true },
   type : { type: String, required: true },
   question : { type: String, required: true },
});

const Question = new Schema({
    facteur : { type: String, required: true },
    questions: [QuestionItem],
});

const MonChoixProgrammeSchema = new Schema({
    titre: { type: String, required: true },
    directives: [Directive], 
    piedPage: { type: String, required: true },
    question: [Question],
});

module.exports = mongoose.model('Questionnaire_MonChoixProgramme', MonChoixProgrammeSchema);