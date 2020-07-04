import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Column, Double } from 'typeorm'
import Description from './description'
import ProductImage from './productImage'
import Product from './product'

@Entity()
export default class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'double'
  })
  price: number

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

  @OneToMany(type => ProductImage, productImages => productImages.productDetail)
  productImages!: ProductImage[]

  @OneToMany(type => Product, product => product.productDetail)
  public products!: Product[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}