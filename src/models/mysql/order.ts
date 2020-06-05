import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Customer from './customer'
import BillingInfo from './billingInfo'
import Shipper from './shipper'
import ProductToOrder from './productToOrder'
import Address from './address'

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'double'
  })
  totalShippingPrice: number

  @OneToOne(type => Address)
  @JoinColumn()
  address: Address

  @OneToOne(type => BillingInfo)
  @JoinColumn()
  billingInfo: BillingInfo

  @OneToOne(type => Shipper)
  @JoinColumn()
  shipper: Shipper

  @ManyToOne(type => Customer, customer => customer.orders)
  customer: Customer

  @OneToMany(type => ProductToOrder, productToOrder => productToOrder.order)
  productToOrders!: ProductToOrder[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
  
}