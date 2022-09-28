import { Comment } from '../comments/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Code } from 'typeorm';
import { JWT } from '../jwt/jwt.entity';

@Entity('users')
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

  @OneToMany(() => JWT, jwt => jwt.users)
  jwt: JWT[]

}

