import express from 'express';
import { body } from 'express-validator';
import { register, login, logout,requestPasswordReset,resetPassword } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validate, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], validate, login);

router.post('/logout', logout);

router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
