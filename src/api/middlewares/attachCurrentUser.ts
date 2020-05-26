import { Container } from 'typedi';
import { Connection } from 'typeorm'
import User from '../../models/mysql/user'
import winston from 'winston';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger: winston.Logger = Container.get('logger');
  try {
    const mysqlConnection: Connection = Container.get('mysqlConnection')
    const userRepository = mysqlConnection.getRepository(User)
    const user = await userRepository.findOne({id: req.token._id})

    if (!user) {
      return res.sendStatus(401);
    }
    
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    req.currentUser = user;

    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
