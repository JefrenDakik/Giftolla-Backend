import { ProductDtoFactory } from './ProductDtoFactory'
import { CountryDtoFactory } from './CountryDtoFactory'
import { AddressDtoFactory } from './AddressDtoFactory'
import { WishlistDtoFactory } from './wishlistDtoFactory'
import { CartDtoFactory } from './CartDtoFactory'

const productDtoFactory = new ProductDtoFactory()
const countryDtoFactory = new CountryDtoFactory()
const addressDtoFactory = new AddressDtoFactory()
const wishlistDtoFactory = new WishlistDtoFactory()
const cartDtoFactory = new CartDtoFactory()

export default {
  productDtoFactory,
  countryDtoFactory,
  addressDtoFactory,
  wishlistDtoFactory,
  cartDtoFactory,
}