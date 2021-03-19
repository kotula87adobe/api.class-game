import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Answer} from "../../answer/entities/answer.entity";

@Entity()
export class Visit extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(type => User, entity => entity.visit, {onDelete: "CASCADE"})
  @JoinColumn()
  user: User

  @OneToMany(type=>Answer, entity=>entity.answer)
  @JoinColumn()
  answer: Answer

}
