import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../keys/rsaprivate.key'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/rsapub.key'), 'utf8');
const options = { expiresIn: '24h' };

export const TokenService = {
  /**
   * signs a new token
   * @param {*} payload 
   */
  sign(payload) {
    return jwt.sign(payload, privateKey, options);
  },

  /**
   * verifies a token
   * @param {*} token 
   */
  verify(token) {
    try {
      return jwt.verify(token, publicKey, options);
    } catch (err) {
      return false;
    }
  },

  /**
   * decodes a token
   * @param {string} token
   * @returns {object} decoded
   */
  decode(token) {
    return jwt.decode(token, { complete: true });
  }
};

