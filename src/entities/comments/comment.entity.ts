import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  content: string;

  @Column('uuid')
  postId: string;

  @Column('uuid')
  userId: string;

  @Column()
  userLogin: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => User, user => user.comments, {onDelete: 'CASCADE'})
  user: User

}