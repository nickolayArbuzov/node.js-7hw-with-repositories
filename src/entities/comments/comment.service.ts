import { Inject, Injectable } from '@nestjs/common';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';
import { CreateCommentDto } from './dto/comment.dto';
import { CommentRepositoryTypeORM } from './comment.repositoryTypeORM';
import { ICommentRepositoryInterface } from './interface/repoInterface';

@Injectable()
export class CommentService {
  constructor(
    @Inject('Repository')
    private readonly commentRepository: ICommentRepositoryInterface,
  ) {}

  async findAllCommentsByPostId(id: string, query: QueryBlogDto) {
    return this.commentRepository.findAllCommentsByPostId(id, query)
  }

  async findOne(id: string) {
    return this.commentRepository.findOne(id)
  }

  async create(postId: string, dto: CreateCommentDto, user: {id: string, login: string}) {
    return this.commentRepository.create(postId, dto, user)
  }

  async updateOne(id: string, dto: CreateCommentDto, userId: string ) {
    return this.commentRepository.updateOne(id, dto, userId)
  }

  async deleteOne(id: string, userId: string) {
    return this.commentRepository.deleteOne(id, userId)
  }
}