const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const middleware = require('../middlewares/auth.js');


/**
 * @swagger
 * /users/getAppToken:
 *   get:
 *     tags:
 *       - user
 *     summary: Récupère l'app token
 *     description: Récupère le token de l'application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               pass:
 *                 type: string
 *                 example: "password123"   
 *     responses:
 *       200:
 *         description: The application token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AppToken:
 *                   type: string
 *                   example : "eyJhbGciMQwsWaIKZXaW5ZlC4RlYativvJqFYz69uY1peE8ELJSUoruu4o9d5Zswv8mj6hdE"
 *       400:
 *         description: Input validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All input is required"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ask administrator for access"
 */
router.get('/getAppToken', usersController.getAppToken);

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - user
 *     summary: Créer un usager
 *     description: Ajoute un usager à la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Bobby" 
 *               prenom:
 *                 type: string
 *                 example: "Dolly" 
 *               email:
 *                 type: string
 *                 example: "Bobby.dolly@example.com" 
 *               password:
 *                 type: string
 *                 example: "TotallySecurePassword123" 
 *               appKey:
 *                 type: string
 *                 example: "eyJhbGciWaIKZXaW5ZlC4RlYativvJqFYz69uY1peE8ELJSUoruu4o9d5Zsw"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "123" 
 *                 nom:
 *                   type: string
 *                   example: "Dolly" 
 *                 prenom:
 *                   type: string
 *                   example: "Bobby" 
 *                 type:
 *                   type: string
 *                   example: "user" 
 *                 email:
 *                   type: string
 *                   example: "Bobby.dolly@example.com" 
 *                 password:
 *                   type: string
 *                   example: "$2b$10$UlQByRJIoqHnbIEMbrJPruA3Vw7hPcYkNXCxp49z9wU3nB4BXPehO"
 *                 etatSondage:
 *                   type: string
 *                   example: "Vide"
 *       400:
 *         description: Input validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tout les champs sont requis !"
 *       401:
 *         description: Invalid application token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Application Token"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création de l'usager. Veuillez reesayer"
 */

router.post('/register', usersController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - user
 *     summary: Authentifie un usager
 *     description: Le connecte et retourne un bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "bobby.dolly@example.com"
 *               password:
 *                 type: string
 *                 example: "TotallySecurePassword123" 
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bearerToken:
 *                   type: string
 *                   example : "eyJhbGciMQwsWaIKZXaW5ZlC4RlYativvJqFYz69uY1peE8ELJSUoruu4o9d5Zswv8mj6hdE"
 *       400:
 *         description: Input validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tout les champs sont requis"
 */
router.post('/login', usersController.login);

module.exports = router;