import { generateAndSendOTP, verifyOTP } from '../services/otp.service.js';
import User from '../models/user.model.js';
import { isStrongPassword } from '../utils/validatePassword.js';

export async function requestOTP(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  await generateAndSendOTP(email);
  res.status(200).json({ message: 'OTP sent to email' });
}

export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;
    if (!isStrongPassword(newPassword)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    });
  }

  try {
    await verifyOTP(email, otp);
    const user = await User.findOne({ where: { email } });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
