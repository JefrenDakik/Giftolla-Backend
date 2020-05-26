import User from '../../models/mysql/user';
declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
    }    
  }
}
