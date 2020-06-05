import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Product from './product'
import Order from './order'

@Entity()
export default class ProductToOrder {
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

  @ManyToOne(type => Product, product => product.productToOrders)
  product!: Product

  @ManyToOne(type => Order, order => order.productToOrders)
  order!: Order

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}