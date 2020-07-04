import { Connection } from "typeorm"
import Color from "../models/mysql/color"
import colorSeedData from "./data/colorSeedData"

export default async function colorSeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(Color)
    .save(colorSeedData)
}