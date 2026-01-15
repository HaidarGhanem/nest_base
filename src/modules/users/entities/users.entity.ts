import { BaseEntity } from "src/common/entities/base.entity";
import { Entity, Column } from 'typeorm';

@Entity('users') 
export class User extends BaseEntity {

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

}