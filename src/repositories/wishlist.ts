import Container, { Service } from "typedi"
import { Repository, EntityRepository, IsNull } from "typeorm"
import winston from "winston"
import Wishlist from "../models/mysql/wishlist"
import Factory from "../factory"
import { IWishlistItemDto } from "../interfaces/IWishlist"

@Service()
@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async createWishlist(): Promise<Wishlist> {
    const wishlistRecord = await this.save({})
      .then(wishlist => {
        return wishlist
      })
      .catch(error => {
        throw new Error(error)
      })

    return wishlistRecord
  }

}