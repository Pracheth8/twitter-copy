import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} from '../controllers/follow.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow/unfollow users
 */

/**
 * @swagger
 * /follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Followed
 */
router.post('/follow/:userId', authMiddleware, followUser);

/**
 * @swagger
 * /unfollow/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Unfollowed
 */
router.delete('/unfollow/:userId', authMiddleware, unfollowUser);

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: List of followers
 */
router.get('/followers/:userId', getFollowers);

/**
 * @swagger
 * /following/{userId}:
 *   get:
 *     summary: Get users followed by a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: List of users the given user is following
 */
router.get('/following/:userId', getFollowing);

export default router;
