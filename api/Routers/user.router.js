import express from 'express'
import { deleteUser, signOut, test, updateUser } from '../Controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router= express.Router();
router.get('/test',test);
router.put('/update/:userId', verifyToken ,updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);
export default router;