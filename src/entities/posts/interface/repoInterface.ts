import { QueryBlogDto } from "../../../helpers/commonDTO/query.dto"
import { CreatePostDto, UpdatePostDto} from "../dto/post.dto"

export interface IPostRepositoryInterface {
    findAll(query: any): any
    findAllPostsByBlogId(id: string, query: QueryBlogDto): any
    findOne(id: string): any
    createPost(dto: CreatePostDto): any
    creatPostForBlogId(dto: CreatePostDto, id: string, name: string): any
    updatePost(id: string, dto: UpdatePostDto): any
    deletePost(id: string): any
}