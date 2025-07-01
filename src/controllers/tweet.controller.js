import Tweet from '../models/tweet.model.js';
import Follow from '../models/follow.model.js'; // optional if filtering feed
import { Op } from 'sequelize';

// Create
export async function createTweet(req, res) {
  const { content, isPrivate } = req.body;

  if (content.length > 280) {
    return res.status(400).json({ message: 'Content exceeds 280 characters' });
  }

  const tweet = await Tweet.create({
    content,
    isPrivate: !!isPrivate,
    userId: req.user.id,
  });

  res.status(201).json(tweet);
}

// Edit
export async function updateTweet(req, res) {
  const { id } = req.params;
  const tweet = await Tweet.findByPk(id);

  if (!tweet || tweet.userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  tweet.content = req.body.content || tweet.content;
  tweet.isPrivate = req.body.isPrivate ?? tweet.isPrivate;
  await tweet.save();

  res.json(tweet);
}

// Delete
export async function deleteTweet(req, res) {
  const { id } = req.params;
  const tweet = await Tweet.findByPk(id);

  if (!tweet || tweet.userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  await tweet.destroy();
  res.status(204).end();
}

// Get all public tweets
export async function getPublicTweets(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const tweets = await Tweet.findAndCountAll({
    where: { isPrivate: false },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
    include: ['User'],
  });

  res.json({
    total: tweets.count,
    page: parseInt(page),
    tweets: tweets.rows,
  });
}

// Feed: tweets of followed users + public
export async function getUserFeed(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const followedUsers = await Follow.findAll({
    where: { followerId: req.user.id },
    attributes: ['followingId'],
  });

  const followedIds = followedUsers.map(f => f.followingId);

  const tweets = await Tweet.findAndCountAll({
    where: {
      [Op.or]: [
        { isPrivate: false },
        { userId: { [Op.in]: followedIds }, isPrivate: true }
      ],
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
    include: ['User'],
  });

  res.json({
    total: tweets.count,
    page: parseInt(page),
    tweets: tweets.rows,
  });
}
