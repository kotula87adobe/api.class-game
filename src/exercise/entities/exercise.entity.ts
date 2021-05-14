import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Owner} from "../../owner/entities/owner.entity";

@Entity()
export class Exercise extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  url: string

  @ManyToOne(type=>Owner,entity=>entity.exercise,{onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

}