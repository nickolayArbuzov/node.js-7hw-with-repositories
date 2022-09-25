import { QueryBlogDto } from "../../../helpers/commonDTO/query.dto"
import { CreateCommentDto } from "../dto/comment.dto"

export interface ICommentRepositoryInterface {
    findAllCommentsByPostId(id: string, query: QueryBlogDto): any
    findOne(id: string): any
    create(postId: string, dto: CreateCommentDto, user: {id: string, login: string}): any
    updateOne(id: string, dto: CreateCommentDto, userId: string ): any
    deleteOne(id: string, userId: string): any
}