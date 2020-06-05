import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Column, Double } from 'typeorm'
import ProductToOrder from './productToOrder'
import ProductToCart from './productToCart'
import ProductToWishlist from './productToWishlist'
import Description from './description'
import ProductImage from './productImage'

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'double'
  })
  price: number

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 5,
    default: 0
  })
  saleRatio!: number

  @Column({
    type: 'char',
    length: 7
  })
  colorHexadecimal: string

  @Column()
  language: string

  @Column()
  category: string

  // Description paragragh for product
  @Column({
    type: 'text'
  })
  infoParagragh: string

  @OneToOne(type => Description)
  @JoinColumn()
  description: Description

  @OneToMany(type => ProductImage, productImages => productImages.product)
  productImages!: ProductImage[]

  // @OneToMany(type => ProductToColorToLanguage, productToColorToLanguage => productToColorToLanguage.product)
  // productToColorToLanguages!: ProductToColorToLanguage[]

  // @OneToMany(type => ProductToCategory, productToCategory => productToCategory.product)
  // productToCategories!: ProductToCategory[]

  @OneToMany(type => ProductToOrder, productToOrder => productToOrder.product)
  productToOrders!: ProductToOrder[]

  @OneToMany(type => ProductToCart, productToCart => productToCart.product)
  productToCarts!: ProductToCart[]

  @OneToMany(type => ProductToWishlist, productToWishlist => productToWishlist.product)
  productToWishlists!: ProductToWishlist[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}