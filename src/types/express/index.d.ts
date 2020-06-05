import Customer from '../../models/mysql/customer';

declare global {
  declare namespace Express {
    export interface Request {
      currentCustomer: Customer;
    }    
  }
}
