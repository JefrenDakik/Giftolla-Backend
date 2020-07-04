import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'
import ProductDetail from './productDetail'

@Entity()
export default class ProductImage {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  src: string

  @ManyToOne(type => ProductDetail, productDetail => productDetail.productImages)
  productDetail: ProductDetail

  @CreateDateColumn()
  createdAt?

  @UpdateDateColumn()
  updatedAt?

  @DeleteDateColumn()
  deletedAt?

}