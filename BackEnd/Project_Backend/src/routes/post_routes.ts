import express from 'express'
const router = express.Router()
import { getAllPosts, getPostById, deletePostById, createNewPost } from '../controllers/post'

import authenticate from '../common/auth_middleware'

router.get('/',getAllPosts)

// router.post('/',authenticate,createNewPost)
router.post('/',createNewPost)

router.get('/:id',getPostById)

router.delete('/:id',authenticate,deletePostById)

export = router
