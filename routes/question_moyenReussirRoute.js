const express = require('express');
const router = express.Router();
const question_MoyenReussirController = require('../controller/questionnaire_MoyenReussirController.js');
const middleware = require('../middleware/auth.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Actions:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *         action:
 *           type: string
 *     Ressources:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *         ressource:
 *           type: string
 *     QuestionMoyenReussite:
 *       type: object
 *       properties:
 *         facteur:
 *           type: string
 *         titre:
 *           type: string
 *         actions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Actions'
 *         ressources:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ressources'
 *     Questionnaire_MoyensPourReussir:
 *       type: object
 *       properties:
 *         titre:
 *           type: string
 *         sousTitre:
 *           type: string
 *         piedPage:
 *           type: string
 *         questionMoyenReussite:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionMoyenReussite'
 */

/**
 * @swagger
 * /questionnaire-moyens-pour-reussir/getAllQuestions:
 *   get:
 *     tags:
 *       - moyens-pour-reussir
 *     summary: Récupère toutes les questions
 *     responses:
 *       200:
 *         description: Liste des questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Questionnaire_MoyensPourReussir'
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getAllQuestions', middleware.verifyTokenUser, question_MoyenReussirController.getAllQuestions);

/**
 * @swagger
 * /questionnaire-moyens-pour-reussir/getByType/{type}:
 *   get:
 *     tags:
 *       - moyens-pour-reussir
 *     summary: Récupère les actions et ressources par type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Le type d'actions et de ressources à récupérer
 *     responses:
 *       200:
 *         description: Liste des actions et ressources du type spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Actions'
 *                 ressources:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ressources'
 *       403:
 *         description: A token is required for authentication
 *       500:
 *         description: Server Error
 */
router.get('/getByType/:type',middleware.verifyTokenUser, question_MoyenReussirController.getByType);

/**
 * @swagger
 * /questionnaire-moyens-pour-reussir/addActionToUser:
 *   post:
 *     tags:
 *       - moyens-pour-reussir
 *     summary: Ajoute une action à un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Actions'
 *     responses:
 *       200:
 *         description: Action ajoutée avec succès
 *       403:
 *         description: A token is required for authentication
 *       404:
 *         description: Utilisateur non trouvé
 *       409:
 *         description: L'action existe déjà
 *       500:
 *         description: Server Error
 * 
 */
router.post('/addActionToUser',middleware.verifyTokenUser, question_MoyenReussirController.addActionToUser);

/**
 * @swagger
 * /questionnaire-moyens-pour-reussir/addRessourceToUser:
 *   post:
 *     tags:
 *       - moyens-pour-reussir
 *     summary: Ajoute une ressource à un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ressource:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Ressources'
 *     responses:
 *       200:
 *         description: Ressource ajoutée avec succès
 *       403:
 *         description: A token is required for authentication
 *       404:
 *         description: Utilisateur non trouvé
 *       409:
 *         description: La ressource existe déjà
 *       500:
 *         description: Server Error
 */
router.post('/addRessourceToUser',middleware.verifyTokenUser, question_MoyenReussirController.addRessourceToUser);

/**
 * @swagger
 * /getReponseRessourceActionFromUser:
 *   get:
 *     tags:
 *       - moyens-pour-reussir
 *     summary: Récupère la réponse de l'utilisateur à la ressource d'action
 *     responses:
 *       200:
 *         description: La réponse a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Actions'
 *                 ressources:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ressources'
 *       403:
 *         description: A token is required for authentication
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Server Error
 */
router.get('/getReponseRessourceActionFromUser', middleware.verifyTokenUser, question_MoyenReussirController.getReponseRessourceActionFromUser);

module.exports = router;