import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import ProductToWishlist from "../models/mysql/productToWishlist"
import Factory from "../factory"
import { IWishlistItemDto } from "../interfaces/IWishlist"

@Service()
@EntityRepository(ProductToWishlist)
export class ProductToWishlistRepository extends Repository<ProductToWishlist>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async saveProductToWishlist(productToWishlists: ProductToWishlist): Promise<IWishlistItemDto> {
    const productToWishlistRecord = await this.save(productToWishlists)
    .then(productToWishlists => {
      return productToWishlists
    })
    .catch(error => {
      throw new Error(error)
    })

    const wishlistItemDto = Factory.wishlistDtoFactory.createWishlistItemDto(productToWishlistRecord)

    return wishlistItemDto 
  }

  public async saveWishlist(wishlist: ProductToWishlist[]): Promise<IWishlistItemDto[]> {
    const productToWishlistRecords = await this.save(wishlist)
    .then(wishlist => {
      return wishlist
    })
    .catch(error => {
      throw new Error(error)
    })

    const wishlistItemsDto = Factory.wishlistDtoFactory.createWishlistDto(productToWishlistRecords)

    return wishlistItemsDto 
  }

  public async deleteProductToWishlist(wishlistId: number, productId: number) {
    const result = await this.delete({
      productId: productId,
      wishlistId: wishlistId,
    })
    .then(result => {
      return result
    })
    .catch(error => {
      throw new Error(error)
    })

    return result
  }

  public async getWishlist(wishlistId: number) {
    const wishlistRecord = await this.find({
      where: { wishlistId: wishlistId },
    })
    .then(wishlist => {
      return wishlist
    })
    .catch(error => {
      throw new Error(error)
    })

    let wishlistDto: IWishlistItemDto[] = []
    if(wishlistRecord) {
      wishlistDto = Factory.wishlistDtoFactory.createWishlistDto(wishlistRecord)
    }
    
    return wishlistDto
  }

}