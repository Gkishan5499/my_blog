import express from 'express'
import { createComment, getPostComment, likesComment, editComment, deleteComment, getcomments} from '../Controller/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostComment/:postId', getPostComment);
router.put('/likesComment/:commentId', verifyToken,  likesComment);
router.put('/editComment/:commentId', verifyToken,  editComment);
router.delete('/deleteComment/:commentId', verifyToken,  deleteComment);
router.get('/getcomments',verifyToken, getcomments);






export default router;