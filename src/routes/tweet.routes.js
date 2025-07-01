import express from 'express';
import {
  createTweet,
  updateTweet,
  deleteTweet,
  getPublicTweets,
  getUserFeed,
} from '../controllers/tweet.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Tweet management
 */

/**
 * @swagger
 * /tweets:
 *   post:
 *     summary: Create a tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *               isPrivate:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tweet created
 */
router.post('/', authMiddleware, createTweet);

/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Get all public tweets
 *     tags: [Tweets]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of public tweets
 */
router.get('/', getPublicTweets);

/**
 * @swagger
 * /tweets/feed:
 *   get:
 *     summary: Get tweets from followed users (with private visibility)
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personalized tweet feed
 */
router.get('/feed', authMiddleware, getUserFeed);

/**
 * @swagger
 * /tweets/{id}:
 *   put:
 *     summary: Update your tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               isPrivate:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tweet updated
 */
router.put('/:id', authMiddleware, updateTweet);

/**
 * @swagger
 * /tweets/{id}:
 *   delete:
 *     summary: Delete your tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Tweet deleted
 */
router.delete('/:id', authMiddleware, deleteTweet);

export default router;
