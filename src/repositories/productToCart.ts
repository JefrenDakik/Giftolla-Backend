import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import Factory from "../factory"
import ProductToCart from "../models/mysql/productToCart"
import { ICartItemDto } from "../interfaces/ICart"

@Service()
@EntityRepository(ProductToCart)
export class ProductToCartRepository extends Repository<ProductToCart>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async saveCart(productToCarts: ProductToCart[]): Promise<ICartItemDto[]> {
    const productToCartRecords = await this.save(productToCarts)
    .then(productToCarts => {
      return productToCarts
    })
    .catch(error => {
      throw new Error(error)
    })

    const cartItemsDto = Factory.cartDtoFactory.createCartItemsDto(productToCartRecords)

    return cartItemsDto 
  }

  public async getCart(cartId: number) {
    const productToCartRecords = await this.find({
      where: { cartId: cartId },
    })
    .then(wishlist => {
      return wishlist
    })
    .catch(error => {
      throw new Error(error)
    })

    let cartItemsDto: ICartItemDto[] = []
    if(productToCartRecords) {
      cartItemsDto = Factory.cartDtoFactory.createCartItemsDto(productToCartRecords)
    }
    
    return cartItemsDto
  }

  public async deleteProductToCart(cartId: number, productId: number) {
    const result = await this.delete({
      productId: productId,
      cartId: cartId,
    })
    .then(result => {
      return result
    })
    .catch(error => {
      throw new Error(error)
    })

    return result
  }

}