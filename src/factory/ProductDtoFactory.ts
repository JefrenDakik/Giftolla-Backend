import { IProductDto } from '../interfaces/IProduct'
import Product from '../models/mysql/product'

export class ProductDtoFactory {

  public createProductsDto(products: Product[]): IProductDto[] {
    let productsDto: IProductDto[] = []

    products.forEach(product => {
      let productDto = {} as IProductDto

      let outOfStock: boolean = false
      if(product.quantity == 0) {
        outOfStock = true
      }
      
      delete product.productDetail.description.updatedAt
      delete product.productDetail.description.deletedAt
      delete product.productDetail.description.createdAt
      delete product.productDetail.description.id

      // this is to add the colors to an array since a product may be repeated
      const found = productsDto.find(element => element.id == product.productDetail.id)
      if(!found) {
        productDto = {
          id: product.productDetail.id,
          name: product.productDetail.name,
          price: product.productDetail.price,
          language: product.productDetail.language,
          category: product.productDetail.category,
          infoParagragh: product.productDetail.infoParagragh,
          description: product.productDetail.description,
          images: product.productDetail.productImages,
          colors: [
            {
              id: product.color.id,
              productId: product.id,
              name: product.color.name,
              salePrice: product.saleRatio * product.productDetail.price,
              hexadecimal: product.color.hexadecimal,
              saleRatio: product.saleRatio,
              outOfStock: outOfStock
            }
          ]
        }
        productsDto.push(productDto)

      } else {
        productsDto.find(element => element.id == product.productDetail.id)?.colors
        .push({
          id: product.color.id,
          productId: product.id,
          name: product.color.name,
          salePrice: product.saleRatio * product.productDetail.price,
          hexadecimal: product.color.hexadecimal,
          saleRatio: product.saleRatio,
          outOfStock: outOfStock
        })
      }

    })

    return productsDto
  }
}