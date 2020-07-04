import { Container } from 'typedi';
import { Connection } from 'typeorm'
import Customer from '../../models/mysql/customer'
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
    const customerRepository = mysqlConnection.getRepository(Customer)
    const customer = await customerRepository.findOne({ 
      where: { id: req.token._id },
      relations: ['wishlist', 'cart']
    })

    if (!customer) {
      return res.sendStatus(401);
    }
    
    Reflect.deleteProperty(customer, 'password');
    Reflect.deleteProperty(customer, 'salt');
    req.currentCustomer = customer;

    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
