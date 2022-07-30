import express from 'express'
const router = express.Router()
import { getAllPosts, getPostById, deletePostById, createNewPost,getPostByUser,updateUsersPost } from '../controller/post'
import authenticate from '../common/auth_middleware'



/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Posts managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - sender
 *         - message
 *       properties:
 *         sender:
 *           type: string
 *           description: the senders mail
 *         message:
 *           type: string
 *           description: the message
 *       example:
 *         sender: 'bob@gmail.com'
 *         message: 'this is a message by bob'
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all Posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successfully obtain all Posts
 *
 */
router.get('/',getAllPosts)


router.get('/user/:user', getPostByUser)


/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get Post by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: the post's id
 *       required: true
 *       input: 624d8f0b439e9fe03350229f
 *       type: String
 *       id: 624d8f0b439e9fe03350229f
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: successfully obtain a post by id
 *       400:
 *         description: No id Provided
 *
 *
 */
router.get('/:id',getPostById)

/**
 * @swagger
 * /post:
 *  post:
 *      summary: Create a new post
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: message posted successfully
 *
 *
 *
 *
 *
 *
 */
router.post('/',authenticate,createNewPost)



router.delete('/:id?',authenticate,deletePostById)

router.post('/updatepost/:id',authenticate ,updateUsersPost)



export = router
