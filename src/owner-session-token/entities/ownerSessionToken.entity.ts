import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Owner} from "../../owner/entities/owner.entity";

@Entity()
export class OwnerSessionToken extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string

  // @Column()
  // token: string

  @ManyToOne(type => Owner, entity => entity.ownerSessionToken, {onDelete: "CASCADE"})
  @JoinColumn()
  owner: Owner

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

}