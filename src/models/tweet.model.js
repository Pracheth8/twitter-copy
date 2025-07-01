import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Tweet = sequelize.define('Tweet', {
  content: {
    type: DataTypes.STRING(280),
    allowNull: false,
  },
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Tweet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Tweet, { foreignKey: 'userId' });

export default Tweet;
