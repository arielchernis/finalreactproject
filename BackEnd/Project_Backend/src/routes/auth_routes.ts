import express from "express";
const router = express.Router();
import Auth from "../controllers/auth";
import authenticate from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login success retuns access and refresh tokens and user id
 *         content:
 *           application/json:
 *             schema:
 *               access_token:
 *                 type: string
 *                 description: The refresh Token
 *               refresh_token:
 *                 type: string
 *                 description: The refresh Token
 *               _id:
 *                 type: string
 *                 description: The user id
 *             example:
 *               access_token: '223412341...'
 *               refresh_token: '123456...'
 *               _id: "adfasdfasdfasdfsd"
 *
 */

router.post("/register", Auth.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Register success retuns access and refresh tokens and user id
 *         content:
 *           application/json:
 *             schema:
 *               access_token:
 *                 type: string
 *                 description: The refresh Token
 *               refresh_token:
 *                 type: string
 *                 description: The refresh Token
 *               _id:
 *                 type: string
 *                 description: The user id
 *             example:
 *               access_token: '12341234...'
 *               refresh_token: '234234234...'
 *               _id: "adfasdfasdfasdfsd"
 *
 */
router.post("/login", Auth.login);


/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: refresh access token using the refresh token
 *     tags: [Auth]
 * 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success retuns access and refresh tokens and user id
 *         content:
 *           application/json:
 *             schema:
 *               access_token:
 *                 type: string
 *                 description: The refresh Token
 *               refresh_token:
 *                 type: string
 *                 description: The refresh Token
 *               _id:
 *                 type: string
 *                 description: The user id
 *             example:
 *               access_token: '21341234...'
 *               refresh_token: '123412341...'
 *               _id: "adfasdfasdfasdfsd"
 *
 */
router.get("/refresh", Auth.renewToken);


/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: test access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success 
 *
 */
router.get("/test", authenticate, Auth.test);
router.get("/test2", Auth.test);

export = router;
