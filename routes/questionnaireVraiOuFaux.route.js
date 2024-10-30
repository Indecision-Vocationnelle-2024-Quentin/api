const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaire_VraiFaux.js');
const middleware = require('../middlewares/auth.js');

router.post('/obtenirQuestionsVraiouFaux', middleware.verifyTokenUser, questionnaireController.getQuestionsVraiFaux);