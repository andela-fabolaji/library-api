import bcrypt from 'bcryptjs';
import { user } from '../../database/models';
import { sendMail, tokenService } from '../../services'

export const Auth = {
  async signup(req, res, next) {
    try {
      const newUser = await user.create(req.body);

      if (newUser) {
        delete newUser.password;
        const { id, firstname, email } = newUser;
        const token = tokenService.issue({ id, firstname, email });
        
        res.status(201).send({
          message: 'User created successfully',
          data: newUser,
          token
        });
      }
    } catch (err) {
      next(err);
    }
  },

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
          const token = tokenService.issue({ id, firstname, email });

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
