import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Product from './product'
import Wishlist from './wishlist'

@Entity()
export default class ProductToWishlist {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int'
  })
  quantity: number

  @Column({
    type: 'double'
  })
  totalUnitPrice: number

  @ManyToOne(type => Product, product => product.productToWishlists)
  product!: Product

  @ManyToOne(type => Wishlist, wishlist => wishlist.productToWishlists)
  wishlist!: Wishlist

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}