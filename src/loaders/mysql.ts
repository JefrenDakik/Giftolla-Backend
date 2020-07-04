import {createConnection, useContainer, Connection } from "typeorm"
import { Container } from 'typedi'
import seedDatabase from '../seeds/index'

export default async () => {
  useContainer(Container)
  const connection =  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Jd00349689",
    database: "be-unique",
    entities: [
      __dirname + "/../models/mysql/*.ts"
    ],
    synchronize: true,
    logging: false
  }).then(async connection => {
    return connection
    // here you can start to work with your entities
  }).catch(error => console.log(error))

  seedDatabase(connection)

  return connection
}
