import { ICartItemDto } from '../interfaces/ICart'
import ProductToCart from '../models/mysql/productToCart'

export class CartDtoFactory {

  public createCartItemsDto(productToCarts: ProductToCart[]): ICartItemDto[] {
    let cartItemsDto: ICartItemDto[] = []

    productToCarts.forEach(productToCart => {
      const cartItemDto = this.createCartItemDto(productToCart)
      
      cartItemsDto.push(cartItemDto)
    })

    return cartItemsDto
  }

  private createCartItemDto(productToCart: ProductToCart): ICartItemDto {
    let cartItemDto = {} as ICartItemDto
    cartItemDto = {
      productId: productToCart.productId,
      quantity: productToCart.quantity,
    }

    return cartItemDto
  }
}