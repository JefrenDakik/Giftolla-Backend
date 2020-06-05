import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import ProductToWishlist from './productToWishlist'

@Entity()
export default class Wishlist {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(type => ProductToWishlist, productToWishlist => productToWishlist.wishlist)
  productToWishlists!: ProductToWishlist[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}