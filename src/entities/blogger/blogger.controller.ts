import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { CratePostDtoWithoutBlogId } from '../posts/dto/post.dto';
import { PostService } from '../posts/post.service';
import { AuthGuard } from '../../infrastructure/guards/auth.guard';
import {BloggerService} from "./blogger.service";
import { CreateBloggerDto, UpdateBloggerDto } from './dto/blogger.dto';
import { QueryBlogDto } from '../../helpers/commonDTO/query.dto';


@Controller('blogs')
export class BloggerController {

    constructor(
        private bloggerService: BloggerService,
        private postService: PostService,
    ) {}
    
    @Get()
    getAll(@Query() query: QueryBlogDto) {
        return this.bloggerService.findAll(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.bloggerService.findOne(id)
    }

    @Get(':id/posts') 
    getPostByBlogId(@Param('id') id: string, @Query() query: QueryBlogDto) { 
        return this.bloggerService.findAllPostsByBlogId(id, query)
    }

    //jwtGuard
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() bloggerDto: CreateBloggerDto) {
        return this.bloggerService.createBlogger(bloggerDto);
    }

    @UseGuards(AuthGuard)
    @Post(':id/posts') 
    async creatPostForBlogId(@Param('id') id: string, @Body() postDto: CratePostDtoWithoutBlogId) {
        const donorBlogger = await this.bloggerService.findOne(id)
        if (donorBlogger) {
            return this.postService.creatPostForBlogId(postDto, donorBlogger.id, donorBlogger.name)
        } else {
            throw new HttpException('Blogger for create-post, not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.bloggerService.deleteBlogger(id)
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: string, @Body() bloggerDto: UpdateBloggerDto){
        return this.bloggerService.updateBlogger(id, bloggerDto)
    }

}