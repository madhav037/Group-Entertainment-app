import express from 'express';
import { addFriend, changePassword, getProfilePicture, uploadProfilePicture } from '../controllers/user.controller.js';
import multer from 'multer';
const router = express.Router()

const upload = multer().single("file");
router.put('/uploadProfilePicture', upload, uploadProfilePicture)
router.get('/getProfilePicture', getProfilePicture)
router.put('/changePassword', changePassword)
router.put('/addFriend', addFriend)

export default router;