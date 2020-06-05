import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import ShipperToCountry from './shipperToCountry';

@Entity()
export default class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50
  })
  name: string

  @Column({
    length: 10
  })
  code: string

  @OneToMany(type => ShipperToCountry, shipperToCountry => shipperToCountry.country)
  public shipperToCountries!: ShipperToCountry[]

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt
}