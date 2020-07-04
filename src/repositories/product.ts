import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import Product from "../models/mysql/product"
import { IProductDto } from "../interfaces/IProduct"
import Factory from "../factory"

@Service()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async getProducts(): Promise<IProductDto[]> {
    const products = await this.find({ relations: 
      ["color", "productDetail", "productDetail.productImages", "productDetail.description"]
      })
      .then(products => {
        return products
      })
      .catch(error => {
        throw new Error(error)
      })
    
    const productsDto = Factory.productDtoFactory.createProductsDto(products)

    return productsDto
  }

}