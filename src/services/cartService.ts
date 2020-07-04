import { Service, Inject } from 'typedi'
import winston from 'winston'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { CartRepository } from '../repositories/cart'
import { ICartInput, ICartItemDto } from '../interfaces/ICart'
import ProductToCart from '../models/mysql/productToCart'
import { ProductToCartRepository } from '../repositories/productToCart'

@Service()
export default class CartService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly cartRepository: CartRepository,
    @InjectRepository() private readonly productToCartRepository: ProductToCartRepository,
  ){}
  
  public async saveCart(customerCartId: number, cartInputs: ICartInput[]): Promise<ICartItemDto[]> {
    const productToCartModels: ProductToCart[] = []

    cartInputs.forEach(input => {
      const productToCartModel = this.productToCartRepository.create({
        cartId: customerCartId,
        quantity: input.quantity,
        productId: input.productId
      })

      productToCartModels.push(productToCartModel)
    })

    const cartItemsDto = await this.productToCartRepository.saveCart(productToCartModels)

    return cartItemsDto
  }

  public async getCart(cartId: number): Promise<ICartItemDto[]> {
    try {
      const cart = await this.productToCartRepository.getCart(cartId)
      return cart
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async deleteProductToCart(customerCartId: number, productId: number)  {
    try {
      const cartItemDto = await this.productToCartRepository.deleteProductToCart(
        customerCartId, 
        productId
      )

      return cartItemDto

    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
