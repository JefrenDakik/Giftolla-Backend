import { Container } from 'typedi';
import LoggerInstance from './logger';

export default async (mysqlConnection) => {
  try {
    Container.set('logger', LoggerInstance)
    Container.set('mysqlConnection', mysqlConnection)
    
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
