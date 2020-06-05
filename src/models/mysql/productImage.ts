import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'
import Product from './product'

@Entity()
export default class ProductImage {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  src: string

  @ManyToOne(type => Product, product => product.productImages)
  product: Product

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}