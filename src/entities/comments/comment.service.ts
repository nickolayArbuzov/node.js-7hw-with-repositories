import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/comment.dto';
import { queryDefault } from '../../helpers/constants/constants';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async findAllCommentsByPostId(id: string, query: QueryBlogDto) {
    const repo = this.commentRepository.createQueryBuilder('comment')
  
    const sortDirection = (query.sortDirection ? query.sortDirection.toLocaleUpperCase() : queryDefault.sortDirection.toLocaleUpperCase()) as 'DESC' | 'ASC'
  
    const all = await repo
      .where({postId: id})
      .skip((query.pageNumber ? (+query.pageNumber-1) : (+queryDefault.pageNumber-1)) * (query.pageSize ? + +query.pageSize : +queryDefault.pageSize))
      .take(query.pageSize ? +query.pageSize : +queryDefault.pageSize)
      .orderBy(`comment.${query.sortBy ? query.sortBy : queryDefault.sortBy}`, sortDirection)
      .getMany()
  
    const count = await repo.getCount()
    //TODO: automapper
    //TODO: property order in returned obj's
    const returnedComments = all.map(a => {
      return {id: a.id, content: a.content, userId: a.userId, userLogin: a.userLogin, createdAt: a.createdAt}
    })
    return {
      pagesCount: Math.ceil(count/(query.pageSize ? + +query.pageSize : +queryDefault.pageSize)), 
      page: query.pageNumber ? +query.pageNumber : +queryDefault.pageNumber, 
      pageSize: query.pageSize ? +query.pageSize : +queryDefault.pageSize, 
      totalCount: count, 
      items: returnedComments
    }
  }

  async findOne(id: string) {
    const donorCommnet = await this.commentRepository.findOne({where: {id: id}});
    if(donorCommnet) {
      return {
        content: donorCommnet.content, 
        createdAt: donorCommnet.createdAt, 
        id: donorCommnet.id, 
        userId: donorCommnet.userId, 
        userLogin: donorCommnet.userLogin,
      }
    } else {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(postId: string, dto: CreateCommentDto, user: {id: string, login: string}) {
    const newComment = new Comment()
    newComment.content = dto.content
    newComment.postId = postId
    newComment.userId = user.id
    newComment.userLogin = user.login
    let date = new Date
    newComment.createdAt = date.toISOString()
    await this.commentRepository.insert(newComment);
    return {
      content: newComment.content, 
      createdAt: newComment.createdAt, 
      id: newComment.id, 
      userId: newComment.userId, 
      userLogin: newComment.userLogin,
    }
  }

  async updateOne(id: string, dto: CreateCommentDto, userId: string ) {
    const donorComment = await this.commentRepository.findOne({where: {id: id}});

    if(donorComment) {
      if(donorComment.userId !== userId) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        const newComment = {
          ...donorComment,
          content: dto.content,
        } 
        await this.commentRepository.update(id, newComment);
        return newComment;
      }
    } else {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteOne(id: string, userId: string) {
    const donorComment = await this.commentRepository.findOne({where: {id: id}});

    if(donorComment) {
      if(donorComment.userId !== userId) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        await this.commentRepository.delete(id)
      }
    } else {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }


}