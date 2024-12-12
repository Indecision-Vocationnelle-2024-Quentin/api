const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaire_VraiFaux.js');
const middleware = require('../middlewares/auth.js');

router.post('/obtenirQuestionsVraiouFaux', middleware.verifyTokenUser, questionnaireController.getQuestionsVraiFaux);
router.post('/obtenirQuestionsVraiouFauxParType', middleware.verifyTokenUser, questionnaireController.getQuestionsVraiFauxParLettreFacteur);
router.post('/nouvelleReponseQuestionVraiFaux', middleware.verifyTokenUser, questionnaireController.nouvelleReponseQuestionVraiFaux);
router.get('/obtenirDetailsQuestionnaire',  questionnaireController.obtenirDetailsQuestionnaire);

// router.post('/test', questionnaireController.test)

module.exports = router;