import express from 'express';
<<<<<<< HEAD
import { addFriend, changePassword, getCurrentUser, getProfilePicture, uploadProfilePicture } from '../controllers/user.controller.js';
=======
import { addFriend, changePassword, getProfilePicture, getUser, uploadProfilePicture } from '../controllers/user.controller.js';
>>>>>>> 3fae3a08f8b98f8c29ee677bce12380b8a2bf4f9
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