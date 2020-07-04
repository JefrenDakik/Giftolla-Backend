import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import ShipperToCountry from './shipperToCountry';
import Product from './product';

@Entity()
export default class Color {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 20
  })
  name: string

  @Column({
    type: 'char',
    length: 7
  })
  hexadecimal: string

  @OneToMany(type => Product, product => product.color)
  public products!: Product[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}