const express = require('express');
const router = express.Router();
const question_MonChoixController = require('../controllers/questionnaire_MonChoixController.js');
const middleware = require('../middlewares/auth.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - facteur
 *         - questions
 *       properties:
 *         facteur:
 *           type: string
 *           description: Le facteur de la question
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionItem'
 *     QuestionItem:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - question
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID de l'élément de la question
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
 */

/**
 * @swagger
 * /questionnaire-mon-choix-programme/getAllQuestions:
 *   get:
 *     tags:
 *       - mon-choix-programme
 *     summary: Récupère toutes les questions
 *     responses:
 *       200:
 *         description: Retourne la liste de toute les questions
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
router.get('/getAllQuestions', middleware.verifyTokenUser, question_MonChoixController.getAllQuestions);

/**
 * @swagger
 * /questionnaire-mon-choix-programme/getByType/{type}:
 *   get:
 *     tags:
 *       - mon-choix-programme
 *     summary: Récupère toutes les questions d'un certain type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Le type de question à récupérer
 *     responses:
 *       200:
 *         description: La liste de toutes les questions du type spécifié
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
router.get('/getByType/:type',middleware.verifyTokenUser, question_MonChoixController.getByType);

/**
 * @swagger
 * /questionnaire-mon-choix-programme/addQuestionToUser:
 *   post:
 *     tags:
 *       - mon-choix-programme
 *     summary: Ajoute une question à un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   reponse:
 *                     type: string
 *                     enum: ['vrai', 'faux']
 *                 required:
 *                   - id
 *                   - type
 *                   - reponse
 *     responses:
 *       201:
 *         description: Réponse ajouté avec succès !
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.post('/addQuestionToUser', middleware.verifyTokenUser, question_MonChoixController.addQuestionToUser);

/**
 * @swagger
 * /questionnaire-mon-choix-programme/getReponseByType/{type}:
 *   get:
 *     tags:
 *       - mon-choix-programme
 *     summary: Récupère les réponses par type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Le type de question à récupérer
 *     responses:
 *       200:
 *         description: Les réponses du type demandé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseType'
 *       403:
 *         description: A token is required for authentication
 *       404:
 *         description: Type non trouvé
 *       500:
 *         description: Server Error
 */
router.get('/getReponseByType/:type', middleware.verifyTokenUser, question_MonChoixController.getReponseByType);

/**
 * @swagger
 * /questionnaire-mon-choix-programme/verifyAllAnswer:
 *   get:
 *     tags:
 *       - mon-choix-programme
 *     summary: Vérifie si toutes les réponses ont été données
 *     responses:
 *       200:
 *         description: Un booléen indiquant si toutes les réponses ont été données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AllAnswered:
 *                   type: boolean
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/verifyAllAnswer', middleware.verifyTokenUser, question_MonChoixController.verifyAllAnswer);

/**
 * @swagger
 * /questionnaire-mon-choix-programme/getAllScoreReponses:
 *   get:
 *     tags:
 *       - mon-choix-programme
 *     summary: Récupère tous les scores des réponses
 *     responses:
 *       200:
 *         description: La liste des scores pour chaque facteur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "S"
 *                   score:
 *                     type: integer
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getAllScoreReponses', middleware.verifyTokenUser, question_MonChoixController.getAllScoreReponses);

module.exports = router;