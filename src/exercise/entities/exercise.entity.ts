import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {Owner} from "../../owner/entities/owner.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Exercise extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  url: string

  @ManyToOne(type=>Owner,entity=>entity.exercise,{onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

  @ManyToMany(type => User,user => user.exercises)
  users: User[]

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

}