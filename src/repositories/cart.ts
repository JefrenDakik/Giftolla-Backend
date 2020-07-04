import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import Product from "../models/mysql/product"
import Cart from "../models/mysql/cart"

@Service()
@EntityRepository(Cart)
export class CartRepository extends Repository<Cart>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async createCart(): Promise<Cart> {
    const cartRecord = await this.save({})
      .then(cart => {
        return cart
      })
      .catch(error => {
        throw new Error(error)
      })

    return cartRecord
  }

}