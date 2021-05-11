import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Owner} from "../../owner/entities/owner.entity";

export class Exercise extends BaseEntity {

  @Column()
  id: string

  @Column()
  url: string

  @ManyToOne(type=>Owner,entity=>entity.exercise,{onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

}