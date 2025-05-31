const redis = require('redis');
const config = require('../../utils/config');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: config.redis.host || '127.0.0.1',
        port: config.redis.port || 6379,
      },
    });

    this._client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    this._connectPromise = this._client.connect();
  }

  async set(key, value, expirationInSecond = 1800) {
    await this._connectPromise;

    const val = typeof value === 'string' ? value : JSON.stringify(value);

    if (expirationInSecond && expirationInSecond > 0) {
      await this._client.set(key, val, { EX: expirationInSecond });
    } else {
      await this._client.set(key, val);
    }
  }

  async get(key) {
    await this._connectPromise;

    const result = await this._client.get(key);

    if (result === null) {
      throw new Error('Cache tidak ditemukan');
    }

    try {
      return JSON.parse(result);
    } catch {
      return result;
    }
  }

  async delete(key) {
    await this._connectPromise;
    await this._client.del(key);
  }
}

module.exports = CacheService;
