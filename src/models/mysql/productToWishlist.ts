import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm'
import Product from './product'
import Wishlist from './wishlist'

@Entity()
export default class ProductToWishlist {
  // @PrimaryGeneratedColumn()
  // id: number

  @PrimaryColumn()
  public productId!: number;

  @PrimaryColumn()
  public wishlistId!: number;

  @Column({
    type: 'int'
  })
  quantity: number

  @Column({
    type: 'boolean'
  })
  checked: boolean

  // @Column({
  //   type: 'double'
  // })
  // totalUnitPrice: number

  @ManyToOne(type => Product, product => product.productToWishlists)
  product!: Product

  @ManyToOne(type => Wishlist, wishlist => wishlist.productToWishlists)
  wishlist!: Wishlist

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt?: Date;

}