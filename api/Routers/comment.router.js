import express from 'express'
import { createComment, getPostComment, likesComment } from '../Controller/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostComment/:postId', getPostComment);
router.put('/likesComment/:commentId', verifyToken,  likesComment);


export default router;