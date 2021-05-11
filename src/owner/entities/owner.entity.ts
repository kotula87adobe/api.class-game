import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {User} from "../../user/entities/user.entity";
import {OwnerSessionToken} from "../../owner-session-token/entities/ownerSessionToken.entity";
import {Exercise} from "../../exercise/entities/exercise.entity";

@Entity()
export class Owner extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(type => User, entity => entity.owner)
  @JoinColumn()
  user: User

  @OneToMany(type => OwnerSessionToken, entity => entity.owner)
  @JoinColumn()
  ownerSessionToken: OwnerSessionToken

  @OneToMany(type => Exercise, entity=>entity.ex)
  exercise: Exercise

  @Column()
  updatedAt: Date


}