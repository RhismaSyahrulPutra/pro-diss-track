const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY, {
      ttlSec: Number(process.env.ACCESS_TOKEN_AGE) || 1800,
    }),

  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY, {
      ttlSec: 60 * 60 * 24 * 7,
    }),

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;

      if (payload.exp && payload.exp < Date.now() / 1000) {
        throw new InvariantError('Refresh token expired');
      }

      return payload;
    } catch {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
