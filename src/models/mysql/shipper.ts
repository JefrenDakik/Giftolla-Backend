import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import ShipperToCountry from './shipperToCountry'

@Entity()
export default class Shipper {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @OneToMany(type => ShipperToCountry, shipperToCountry => shipperToCountry.shipper)
  public shipperToCountries!: ShipperToCountry[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}