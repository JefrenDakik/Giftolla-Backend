import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm'
import ShipperToCountry from './shipperToCountry';
import ProductToOrder from './productToOrder'
import ProductToCart from './productToCart'
import ProductToWishlist from './productToWishlist'
import ProductDetail from './productDetail';
import Color from './color';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity!: number

  @Column({
    type: 'decimal',
    nullable: false,
    precision: 6,
    scale: 5,
    default: 0
  })
  saleRatio!: number

  @OneToMany(type => ProductToOrder, productToOrder => productToOrder.product)
  productToOrders!: ProductToOrder[]

  @OneToMany(type => ProductToCart, productToCart => productToCart.product)
  productToCarts!: ProductToCart[]

  @OneToMany(type => ProductToWishlist, productToWishlist => productToWishlist.product)
  productToWishlists!: ProductToWishlist[]
  
  @ManyToOne(type => ProductDetail, productDetail => productDetail.products)
  public productDetail!: ProductDetail

  @ManyToOne(type => Color, color => color.products)
  public color!: Color

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}