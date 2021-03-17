import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: String

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

}
