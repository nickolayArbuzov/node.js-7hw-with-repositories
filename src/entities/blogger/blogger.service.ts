import { Inject, Injectable } from '@nestjs/common';
import { CreateBloggerDto, UpdateBloggerDto } from './dto/blogger.dto';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';
import { BlogRepositoryTypeORM } from './blog.repositoryTypeORM';
import { IBlogRepositoryInterface } from './interface/repoInterface';


@Injectable()
export class BloggerService {
  constructor(
    @Inject('Repository')
    private readonly blogRepository: IBlogRepositoryInterface
  ) {}

  async findAllPostsByBlogId(id: string, query: QueryBlogDto) {
    return this.blogRepository.findAllPostsByBlogId(id, query)
  }

  async findAll(query: QueryBlogDto) {
    return this.blogRepository.findAll(query)
  }

  async findOneForCustomDecorator(id: string) {
    return this.blogRepository.findOneForCustomDecorator(id)
  }

  async findOne(id: string) {
    return this.blogRepository.findOne(id)
  }
  
  async createBlogger(dto: CreateBloggerDto) {
    return this.blogRepository.createBlogger(dto)
  }

  async updateBlogger(id: string, dto: UpdateBloggerDto) {
    return this.blogRepository.updateBlogger(id, dto)
  }

  async deleteBlogger(id: string) {
    return this.deleteBlogger(id)
  }
  
}