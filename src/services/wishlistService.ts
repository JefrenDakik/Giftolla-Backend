import { Service, Inject } from 'typedi'
import winston from 'winston'
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IWishlistInput, IWishlistItemDto } from '../interfaces/IWishlist';
import { WishlistRepository } from '../repositories/wishlist';
import ProductToWishlist from '../models/mysql/productToWishlist';
import { ProductToWishlistRepository } from '../repositories/productToWishlist';

@Service()
export default class WishlistService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly wishlistRepository: WishlistRepository,
    @InjectRepository() private readonly productToWishlistRepository: ProductToWishlistRepository,
  ){}

  public async saveProductToWishlist(customerWishlistId: number, wishlistInput: IWishlistInput): Promise<IWishlistItemDto>  {
    try {
      const productToWishlistModel = this.productToWishlistRepository.create({
        productId: wishlistInput.productId,
        wishlistId: customerWishlistId,
        quantity: wishlistInput.quantity,
        checked: wishlistInput.checked,
      })

      const wishlistItemDto = await this.productToWishlistRepository.saveProductToWishlist(productToWishlistModel)

      return wishlistItemDto

    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async saveWishlist(customerWishlistId: number, wishlistInputs: IWishlistInput[]): Promise<IWishlistItemDto[]>  {
    try {
      const productToWishlistModels: ProductToWishlist[] = []

      wishlistInputs.forEach(input => {
        const productToWishlistModel = this.productToWishlistRepository.create({
          productId: input.productId,
          wishlistId: customerWishlistId,
          quantity: input.quantity,
          checked: input.checked,
        })

        productToWishlistModels.push(productToWishlistModel)
      })
      
      const wishlistItemsDto = await this.productToWishlistRepository.saveWishlist(productToWishlistModels)

      return wishlistItemsDto

    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async getWishlist(wishlistId: number): Promise<IWishlistItemDto[]> {
    try {
      const wishlist = await this.productToWishlistRepository.getWishlist(wishlistId)
      return wishlist
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async deleteProductToWishlist(customerWishlistId: number, productId: number)  {
    try {
      const result = await this.productToWishlistRepository.deleteProductToWishlist(
        customerWishlistId, 
        productId
      )

      return result
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
