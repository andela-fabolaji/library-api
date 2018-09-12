import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET

export const tokenService = {
  issue(payload) {
    return jwt.sign(
      payload,
      secret,
      { expiresIn: 60 * 60 }
    );
  },

  verify(token, id) {
    const decoded = jwt.verify(token, secret);
    return decoded.id === id;
  }
};

