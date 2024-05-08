import express from 'express';
import { addFriend, changePassword, getCurrentUser, getProfilePicture, uploadProfilePicture } from '../controllers/user.controller.js';
import multer from 'multer';
import { google } from '../controllers/auth.controller.js';
const router = express.Router()

const upload = multer().single("file");
router.put('/uploadProfilePicture', upload, uploadProfilePicture)
router.get('/getProfilePicture', getProfilePicture)
router.put('/changePassword', changePassword)
router.put('/addFriend', addFriend)
router.get('/getCurrentUser', getCurrentUser)
router.post('/google', google)
router.get('/all', getUser)

export default router;