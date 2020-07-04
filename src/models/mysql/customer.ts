import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Country from './country'
import Address from './address'
import Order from './order'
import Cart from './cart'
import Wishlist from './wishlist'
import BillingInfo from './billingInfo'

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  name: string

  @Column("text")
  email: string;

  @Column("text")
  password: string

  @Column()
  salt: string

  @OneToOne(type => Country)
  @JoinColumn()
  country: Country

  @OneToOne(type => Wishlist)
  @JoinColumn()
  wishlist: Wishlist

  @OneToOne(type => Cart)
  @JoinColumn()
  cart: Cart

  @OneToMany(type => Address, address => address.customer)
  addresses: Address[];

  @OneToMany(type => Order, order => order.customer)
  orders: Order[];

  // @OneToMany(type => Cart, cart => cart.customer)
  // carts: Order[];

  @OneToMany(type => BillingInfo, billingInfo => billingInfo.customer)
  billingInfos: BillingInfo[];

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}