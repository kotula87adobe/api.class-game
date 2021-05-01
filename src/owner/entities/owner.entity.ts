import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {User} from "../../user/entities/user.entity";

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

  @Column()
  updatedAt: Date


}