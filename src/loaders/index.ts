import expressLoader from './express'
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger'
import mysqlLoader from './mysql'


export default async({ expressApp }) => {
  const connection = await mysqlLoader()
  Logger.info('✌️ mysql loaded')

  await dependencyInjectorLoader(connection)
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp })
  Logger.info('✌️ Express loaded')
}