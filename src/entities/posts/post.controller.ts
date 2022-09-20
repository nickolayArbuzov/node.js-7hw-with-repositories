import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import {PostService} from "./post.service";
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { AuthGuard } from '../../infrastructure/guards/auth.guard';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';
import { CommentService } from '../comments/comment.service';
import { CreateCommentDto } from '../comments/dto/comment.dto';
import {JwtService} from "@nestjs/jwt";
import { JWTGuard } from '../../infrastructure/guards/jwt.guard';

@Controller('posts')
export class PostController {

    constructor(
        private postService: PostService,
        private commentService: CommentService,
    ) {}
    @Get()
    getAll(@Query() query: QueryBlogDto) {
        return this.postService.findAll(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.postService.findOne(id)
    }

    @Get(':id/comments')
    async getCommentsByPostId(@Param('id') id: string, @Query() query: any) {
        const post = await this.postService.findOne(id)
        if (post){
            return this.commentService.findAllCommentsByPostId(id, query)
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto)
    }

    @UseGuards(JWTGuard)
    @Post(':id/comments')
    async createCommentForPostId(@Param('id') id: string, @Body() commentDto: CreateCommentDto, @Req() req: Request) {
        const post = await this.postService.findOne(id)
        if (post){
            return this.commentService.create(id, commentDto, req.user)
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.postService.deletePost(id)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: string, @Body() postDto: UpdatePostDto){
        return this.postService.updatePost(id, postDto)
    }

}