import { Container } from 'typedi';
import LoggerInstance from './logger';

export default async ({ mysqlConnection, models }: { mysqlConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('mysqlConnection', mysqlConnection)

    Container.set('logger', LoggerInstance)
    
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
