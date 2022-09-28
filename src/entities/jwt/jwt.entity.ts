import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('jwt')
export class JWT {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, users => users.jwt, {onDelete: 'CASCADE'})
  users: User

}