import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Visit extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;


  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(type => User, entity => entity.visit, {onDelete: "CASCADE"})
  @JoinColumn()
  user: User

}
