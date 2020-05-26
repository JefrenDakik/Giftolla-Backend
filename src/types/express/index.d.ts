import User from '../../models/mysql/user';

declare global {
  declare namespace Express {
    export interface Request {
      currentUser: User;
    }    
  }
}
