const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modeleTest = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const modele = mongoose.model('Modele', modeleTest);

module.exports = modele;