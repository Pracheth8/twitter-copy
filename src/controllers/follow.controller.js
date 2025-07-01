import Follow from '../models/follow.model.js';
import User from '../models/user.model.js';

// Follow a user
export async function followUser(req, res) {
  const followerId = req.user.id;
  const { userId: followingId } = req.params;

  if (followerId == followingId) {
    return res.status(400).json({ message: "You can't follow yourself." });
  }

  const existing = await Follow.findOne({ where: { followerId, followingId } });
  if (existing) {
    return res.status(400).json({ message: 'Already following this user.' });
  }

  const follow = await Follow.create({ followerId, followingId });
  res.status(201).json({ message: 'Followed successfully', follow });
}

// Unfollow a user
export async function unfollowUser(req, res) {
  const followerId = req.user.id;
  const { userId: followingId } = req.params;

  const deleted = await Follow.destroy({ where: { followerId, followingId } });

  if (!deleted) {
    return res.status(400).json({ message: 'You were not following this user.' });
  }

  res.json({ message: 'Unfollowed successfully' });
}

// Get followers
export async function getFollowers(req, res) {
  const { userId } = req.params;

  const followers = await Follow.findAll({
    where: { followingId: userId },
    include: [{ model: User, as: 'Follower', attributes: ['id', 'username', 'email'] }]
  });

  res.json(followers.map(f => f.Follower));
}

// Get following
export async function getFollowing(req, res) {
  const { userId } = req.params;

  const following = await Follow.findAll({
    where: { followerId: userId },
    include: [{ model: User, as: 'Following', attributes: ['id', 'username', 'email'] }]
  });

  res.json(following.map(f => f.Following));
}
