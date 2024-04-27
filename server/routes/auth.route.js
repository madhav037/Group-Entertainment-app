import express from 'express';
import { getUser, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router()

router.put('/signin',signin)
router.post('/signup',signup)
router.get('/all', getUser);


export default router;