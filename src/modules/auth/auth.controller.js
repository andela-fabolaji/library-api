import bcrypt from 'bcryptjs';
import { user } from '../../database/models';
import { TokenService } from '../../services';
import eventBus, { SIGNUP } from '../../lib/events';

export const Auth = {
  /**
   * creates a new user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next controller
   */
  async signup(req, res, next) {
    try {
      let newUser = await user.create(req.body);

      if (newUser) {
        newUser = JSON.parse(JSON.stringify(newUser));
        delete newUser.password;
        
        const { id, firstname, email } = newUser;
        const token = TokenService.sign({ id, firstname, email });

        // send verification email
        eventBus.emit(SIGNUP, { firstname, email, token });
        
        res.status(201).send({
          message: 'User created successfully',
          data: newUser,
          token,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async verifyAccount(req, res, next) {
    try {
      const { ref: token } = req.query;
      const decoded = TokenService.decode(token)

      if (!decoded) {
        res.status(401).send({
          message: 'Account verification failed. The verification token may be corrupt. Check your mail for a new verification link.',
        });
      } else {
        const query = { where: { email: decoded.payload.email } };
        const userDetails = await user.findOne(query);

        if (userDetails && userDetails.verified) {
          return res.status(200).send({
            message: 'Account has already been activated',
          });
        } else {
          const verifiedUser = await user.update({ verified: true }, query);
          if (verifiedUser) {
            return res.status(200).send({
              message: 'Account successfully verified',
            });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  },

  /**
   * logs in user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next controller
   */
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const query = {
        where: { email },
        attributes: ['id', 'firstname', 'lastname', 'email', 'status', 'verified', 'password']
      };
      const loggedInUser = await user.findOne(query);

      if (loggedInUser) {
        const passwordMatch = bcrypt.compareSync(password, loggedInUser.password);

        if (passwordMatch) {
          const { id, firstname, email } = loggedInUser;
          const token = tokenService.sign({ id, firstname, email });

          res.status(200).json({
            message: 'Log in successful',
            data: loggedInUser,
            token
          });
        } else {
          res.status(200).json({
            message: 'Username or password mismatch',
          });
        }
      } else {
        res.status(404).json({
          message: 'Username or password mismatch'
        });
      }
    } catch (err) {
      next(err);
    }
  }
};
