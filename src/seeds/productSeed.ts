import { Connection } from "typeorm"
import Product from "../models/mysql/product"
import productSeedData from './data/productSeedData'

export default async function productSeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(Product)
    .save(productSeedData)
}