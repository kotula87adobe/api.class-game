import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Visit} from "../../visit/entities/visit.entity";

@Entity()
export class Answer extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  category: string //np matematyka

  @Column()
  subcategory: string // np mnozenie

  @Column()
  text: string

  @Column()
  answer: string

  @Column()
  isCorrect: boolean

  @ManyToOne(type=>Visit, entity=>entity.answer, {onDelete: "CASCADE"})
  @JoinColumn()
  visit: Visit

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

}
