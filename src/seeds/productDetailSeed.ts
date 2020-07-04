import { Connection } from "typeorm"
import Product from "../models/mysql/product"
import productSeedData from './data/productSeedData'
import ProductDetail from "../models/mysql/productDetail"
import productDetailSeedData from "./data/productDetailSeedData"

export default async function productDetailSeed(connection: Connection): Promise<any> {
  await connection
    .getRepository(ProductDetail)
    .save(productDetailSeedData)
}