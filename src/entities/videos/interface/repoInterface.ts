import { CreateVideoDto, UpdateVideoDto } from "../dto/video.dto"
import { Video } from "../schema/video"

export interface IVideoRepositoryInterface {
    findAll(): any
    findOne(id: string): any
    createVideo(dto: CreateVideoDto): any
    updateVideo(id: string, dto: UpdateVideoDto): any
    deleteVideo(id: string): any
}