import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'

@Entity()
export default class Description {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  size: number

  @Column()
  weight: number

  @Column()
  coverType: string

  @Column()
  pageWeight: number

  @Column()
  numberOfPages: number

  @Column()
  targetGender: string

  @Column()
  setWeight: number

  @Column()
  paperType: string

  @Column()
  numberOfCards: string

  @Column()
  numberOfStickers: number

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}