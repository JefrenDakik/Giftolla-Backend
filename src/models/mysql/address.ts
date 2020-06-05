import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Country from './country'
import Customer from './customer'

@Entity()
export default class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50
  })
  full_name: string

  @Column("text")
  address_line1: string

  @Column("text")
  address_line2: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zip_code: string

  @Column()
  phone_number: string

  @Column()
  delivery_instructions: string

  @Column()
  building_security_code: string

  @OneToOne(type => Country)
  @JoinColumn()
  country: Country

  @ManyToOne(type => Customer, customer => customer.addresses)
  customer: Customer;

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}