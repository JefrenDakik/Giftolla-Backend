import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Customer from './customer'
import Address from './address';

@Entity()
export default class BillingInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  cardNumber: string

  @Column()
  expirationDate: string

  @Column({
    type: 'char',
    length: 3,
  })
  securityCode: string

  @ManyToOne(type => Customer, customer => customer.billingInfos)
  customer: Customer;

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}