import expressLoader from './express'
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger'
import mysqlLoader from './mysql'


export default async({ expressApp }) => {
  const mysqlConnection = await mysqlLoader()
  Logger.info('✌️ mysql loaded')

  /**
   * WTF is going on here?
   *
   * We are injecting the mysql models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/mysql/user').default,
  };

  await dependencyInjectorLoader({
    mysqlConnection,
    models: [
      userModel
    ]
  })
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp })
  Logger.info('✌️ Express loaded')
}