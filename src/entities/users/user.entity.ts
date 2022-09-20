import { Comment } from '../comments/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Code } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  login: string;

  @Column({ length: 20 })
  password: string;

  @Column('text')
  email: string;

  @Column()
  createdAt: string;

  @Column()
  isActivated: boolean;

  @Column()
  code: string;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

}

