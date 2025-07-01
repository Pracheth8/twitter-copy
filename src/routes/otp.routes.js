import express from 'express';
import { requestOTP, resetPassword } from '../controllers/otp.controller.js';

const router = express.Router();

router.post('/request-reset', requestOTP);
router.post('/reset-password', resetPassword);

export default router;
