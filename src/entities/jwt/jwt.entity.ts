import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('jwt')
export class JWT {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('uuid')
  userId: string;

  @Column()
  refreshToken: string;

  @Column()
  revoke: boolean;

  @ManyToOne(() => User, users => users.jwt, {onDelete: 'CASCADE'})
  users: User

}