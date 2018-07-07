import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn } from 'class-validator'


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsIn(["red","blue","green","yellow","magenta"],{
      message: "color doesn't match one of (red, blue, green, yellow, magenta)"
  })
  @Column('text')
  color: string

  
  @Column("json")
  board: string[][]

}