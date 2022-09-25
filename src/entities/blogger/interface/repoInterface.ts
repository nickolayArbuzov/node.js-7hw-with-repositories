import { QueryBlogDto } from "../../../helpers/commonDTO/query.dto"
import { CreateBloggerDto, UpdateBloggerDto } from "../dto/blogger.dto"

export interface IBlogRepositoryInterface {
    findAllPostsByBlogId(id: string, query: QueryBlogDto): any
    findAll(query: QueryBlogDto): any
    findOneForCustomDecorator(id: string): any
    findOne(id: string): any
    createBlogger(dto: CreateBloggerDto): any
    updateBlogger(id: string, dto: UpdateBloggerDto): any
    deleteBlogger(id: string): any

}