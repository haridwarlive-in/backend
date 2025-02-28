import express from 'express';
import { login, logout } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);

export default router;