import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Product from './product'
import Cart from './cart'

@Entity()
export default class ProductToCart {
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

  @ManyToOne(type => Product, product => product.productToCarts)
  product!: Product

  @ManyToOne(type => Cart, cart => cart.productToCarts)
  cart!: Cart

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}