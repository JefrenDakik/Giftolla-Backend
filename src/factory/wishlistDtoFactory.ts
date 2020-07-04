import Wishlist from '../models/mysql/wishlist'
import { IWishlistItemDto } from '../interfaces/IWishlist'
import ProductToWishlist from '../models/mysql/productToWishlist'

export class WishlistDtoFactory {

  public createWishlistDto(productToWishlists: ProductToWishlist[]): IWishlistItemDto[] {
    let wishlistDto: IWishlistItemDto[] = []

    productToWishlists.forEach(productToWishlist => {
      const wishlistItemDto = this.createWishlistItemDto(productToWishlist)
      
      wishlistDto.push(wishlistItemDto)
    })

    return wishlistDto
  }

  public createWishlistItemDto(productToWishlist: ProductToWishlist): IWishlistItemDto {
    let wishlistItemDto = {} as IWishlistItemDto
    wishlistItemDto = {
      productId: productToWishlist.productId,
      quantity: productToWishlist.quantity,
      checked: productToWishlist.checked,
    }

    return wishlistItemDto
  }
}