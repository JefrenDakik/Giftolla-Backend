import { Connection } from "typeorm"
import ProductImage from "../models/mysql/productImage"
import productImageSeedData from './data/productImageSeedData'

export default async function productImageSeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(ProductImage)
    .save(productImageSeedData)
}