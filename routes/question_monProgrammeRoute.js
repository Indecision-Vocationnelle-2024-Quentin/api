const express = require('express');
const router = express.Router();
const question_MonChoixProgrammeSchema = require('../controller/questionnaire_MonProgrammeController.js');
const middleware = require('../middleware/auth.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionItem:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Le type de l'élément de la question
 *         question:
 *           type: string
 *           description: Le texte de la question
 *     ResponseType:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Le type de question
 *         reponsesPositives:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionItem'
 *         reponsesNegatives:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionItem'
 *     QuestionProgrammeEtudes:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Le type du programme d'études
 *         id:
 *           type: string
 *           description: L'identifiant du programme d'études
 *         titre:
 *           type: string
 *           description: Le titre du programme d'études
 *         sousTitre:
 *           type: string
 *           description: Le sous-titre du programme d'études
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionItem'
 *           description: La liste des questions du programme d'études
 */


/**
 * @swagger
 * /questionnaire-mon-programme-etudes/getAllQuestions:
 *   get:
 *     tags:
 *       - mon-programme-etude
 *     summary: Récupère toutes les questions
 *     responses:
 *       200:
 *         description: La liste de toutes les questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuestionProgrammeEtudes'
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getAllQuestions', middleware.verifyTokenUser, question_MonChoixProgrammeSchema.getAllQuestions);


/**
 * @swagger
 * /questionnaire-mon-programme-etudes/getAllQuestionsByAnswer:
 *   post:
 *     tags:
 *       - mon-programme-etude
 *     summary: Récupère toutes les questions filtrées par réponse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reponseFacteur:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     score:
 *                       type: number
 *     responses:
 *       200:
 *         description: La liste des questions filtrées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.post('/getAllQuestionsByAnswer', middleware.verifyTokenUser, question_MonChoixProgrammeSchema.getAllQuestionsByAnswer);

/**
 * @swagger
 * /questionnaire-mon-programme-etudes/getByType/{type}:
 *   get:
 *     tags:
 *       - mon-programme-etude
 *     summary: Récupère les questions par type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Le type de questions à récupérer
 *     responses:
 *       200:
 *         description: La liste des questions du type spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuestionItem'
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getByType/:type',middleware.verifyTokenUser, question_MonChoixProgrammeSchema.getByType);


/**
 * @swagger
 * /questionnaire-mon-programme-etudes/getReponseByType/{type}:
 *   get:
 *     tags:
 *       - mon-programme-etude
 *     summary: Récupère toutes les réponses d'un type spécifique
 *     description: Cette route récupère toutes les réponses d'un type spécifique dans le questionnaire de chaque utilisateur.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Le type de question
 *     responses:
 *       '200':
 *         description: Une liste de réponses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: L'ID de la réponse
 *                   type:
 *                     type: string
 *                     description: Le type de la réponse
 *                   reponse:
 *                     type: string
 *                     description: La réponse elle-même
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getReponseByType/:type',middleware.verifyTokenUser, question_MonChoixProgrammeSchema.getReponseByType);

/**
 * @swagger
 * /questionnaire-mon-programme-etudes/addQuestionToUser:
 *   post:
 *     tags:
 *       - mon-programme-etude
 *     summary: Ajoute une question à l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/QuestionItem'
 *     responses:
 *       200:
 *         description: Question(s) ajouté avec succès
 *       400:
 *         description: reponse est requis
 *       404:
 *         description: Question non trouvée
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.post('/addQuestionToUser', middleware.verifyTokenUser, question_MonChoixProgrammeSchema.addQuestionToUser);

module.exports = router;