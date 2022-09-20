import {Body, Controller, Delete, Get, HttpCode, Param, Put, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from '../../infrastructure/guards/jwt.guard';
import {CommentService} from "./comment.service";
import { CreateCommentDto } from './dto/comment.dto'


@Controller('comments')
export class CommentController {

    constructor(private commentService: CommentService) {}

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.commentService.findOne(id)
    }

    @UseGuards(JWTGuard)
    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: string, @Body() commentDto: CreateCommentDto, @Req() req: Request) {
        return this.commentService.updateOne(id, commentDto, req.user.id)
    }

    @UseGuards(JWTGuard)
    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: string, @Req() req: Request) {
        return this.commentService.deleteOne(id, req.user.id)
    }

}