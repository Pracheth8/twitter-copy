import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Follow = sequelize.define('Follow', {
  followerId: {
    type: DataTypes.UUID, // ✅ Match User's UUID type
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  followingId: {
    type: DataTypes.UUID, // ✅ Match User's UUID type
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  }
}, {});

// ✅ Define relationships
User.belongsToMany(User, {
  through: Follow,
  as: 'Following',
  foreignKey: 'followerId',
  otherKey: 'followingId',
});

User.belongsToMany(User, {
  through: Follow,
  as: 'Followers',
  foreignKey: 'followingId',
  otherKey: 'followerId',
});

export default Follow;
