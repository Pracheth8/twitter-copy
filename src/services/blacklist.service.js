import redis from '../config/redis.js';

const BLACKLIST_PREFIX = 'bl:';

export async function blacklistToken(jti, expSeconds) {
  await redis.set(`${BLACKLIST_PREFIX}${jti}`, 'blacklisted', 'EX', expSeconds);
}

export async function isTokenBlacklisted(jti) {
  const result = await redis.get(`${BLACKLIST_PREFIX}${jti}`);
  return result !== null;
}
