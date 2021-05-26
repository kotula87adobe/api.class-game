import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable
} from "typeorm";
import {Visit} from "../../visit/entities/visit.entity";
import {Owner} from "../../owner/entities/owner.entity";
import {Exercise} from "../../exercise/entities/exercise.entity";

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: String

  @ManyToOne(type=>Owner,entity => entity.users,{onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

  @OneToMany(type => Visit, entity => entity.user)
  @JoinColumn()
  visit: Visit // zmienic na visits: Promise<Visit[]>

  @ManyToMany(type=>Exercise,exercise=>exercise.users)
  @JoinTable()
  exercises: Exercise[]

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

}
