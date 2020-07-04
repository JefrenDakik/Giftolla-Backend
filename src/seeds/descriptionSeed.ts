import { Connection } from "typeorm"
import Description from "../models/mysql/description"
import descriptionSeedData from "./data/descriptionSeedData"

export default async function decsriptionSeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(Description)
    .save(descriptionSeedData)
}