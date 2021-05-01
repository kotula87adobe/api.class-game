import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Visit} from "../../visit/entities/visit.entity";
import {Owner} from "../../owner/entities/owner.entity";

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: String

  @ManyToOne(type=>Owner,entity => entity.user,{onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

  @OneToMany(type => Visit, entity => entity.user)
  @JoinColumn()
  visit: Visit

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

}
