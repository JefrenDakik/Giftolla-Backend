import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import Country from './country'
import Shipper from './shipper'

@Entity()
export default class ShipperToCountry {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public countryId!: number

  @Column()
  public shipperId!: number

  @Column()
  public priority!: number 

  @ManyToOne(type => Shipper, shipper => shipper.shipperToCountries)
  public shipper!: Shipper

  @ManyToOne(type => Country, country => country.shipperToCountries)
  public country!: Country

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}