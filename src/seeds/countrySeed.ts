import { Connection } from "typeorm"
import Country from "../models/mysql/country"
import countrySeedData from "./data/countrySeedData"

export default async function countrySeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(Country)
    .save(countrySeedData)
}