import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'

@Entity()
export default class Description {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  size: number

  @Column({
    nullable: true
  })
  weight: number

  @Column({
    nullable: true
  })
  coverType: string

  @Column({
    nullable: true
  })
  pageWeight: number

  @Column({
    nullable: true
  })
  numberOfPages: number

  @Column({
    nullable: true
  })
  targetGender: string

  @Column({
    nullable: true
  })
  setWeight: number

  @Column({
    nullable: true
  })
  paperType: string

  @Column({
    nullable: true
  })
  numberOfCards: number

  @Column({
    nullable: true
  })
  numberOfStickers: number

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt

  @DeleteDateColumn()
  deletedAt

}