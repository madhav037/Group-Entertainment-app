import express from 'express';
import { uploadProfilePicture } from '../controllers/user.controller.js';
import multer from 'multer';
const router = express.Router()

const upload = multer().single("file");
router.post('/uploadProfilePicture', upload, uploadProfilePicture)


export default router;