import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Customer from './customer'
import ProductToCart from './productToCart'

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Customer, customer => customer.carts)
  customer: Customer

  @OneToMany(type => ProductToCart, productToCart => productToCart.cart)
  productToCarts!: ProductToCart[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}