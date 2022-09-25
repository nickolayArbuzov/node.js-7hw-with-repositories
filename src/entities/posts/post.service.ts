import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';
import { PostRepositoryTypeORM } from './post.repositoryTypeORM';

@Injectable()
export class PostService {
  constructor(
    @Inject('Repository')
    private readonly postRepository: PostRepositoryTypeORM,
  ) {}

  async findAll(query: QueryBlogDto) {
    return this.postRepository.findAll(query)
  }

  async findAllPostsByBlogId(id: string, query: QueryBlogDto) {
    return this.postRepository.findAllPostsByBlogId(id, query)
  } 

  async findOne(id: string) {
    return this.postRepository.findOne(id)
  }

  async createPost(dto: CreatePostDto) {
    return this.postRepository.createPost(dto)
  }

  async creatPostForBlogId(dto: CreatePostDto, id: string, name: string){
    return this.postRepository.creatPostForBlogId(dto, id, name)
  }

  async updatePost(id: string, dto: UpdatePostDto) {
    return this.postRepository.updatePost(id, dto)
  }

  async deletePost(id: string) {
    return this.postRepository.deletePost(id)
  }

}