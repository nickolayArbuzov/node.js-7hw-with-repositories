import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { addDays } from '../../helpers/date';
import { Model } from 'mongoose';
import { VideoModel } from './schema/video.interface';
import { Video } from './schema/video';
import { IVideoRepositoryInterface } from './interface/repoInterface';


@Injectable()
export class VideoRepositoryMongo implements IVideoRepositoryInterface {
  constructor(
    @Inject('VIDEO_MONGOOSE')
    private videoRepository: Model<VideoModel>,
  ) {}

  async findAll() {
    console.log('mongo')
    return this.videoRepository.find();
  }

  async findOne(id: string) {
    const donorVideo = await this.videoRepository.findOne({where: {id: id}});
    if(donorVideo) {
      return donorVideo
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }

  async createVideo(dto: CreateVideoDto) {
    /*const video = new this.videoRepository({
      title
    })
    await video.save()
    const newVideo = new Video()
    newVideo.title = dto.title
    newVideo.author = dto.author
    newVideo.availableResolutions = dto.availableResolutions
    newVideo.minAgeRestriction = null
    let date = new Date
    newVideo.createdAt = date.toISOString()
    newVideo.publicationDate = addDays(date, 1).toISOString()
    await this.videoRepository.create(video);
    return newVideo;*/
  }

  async updateVideo(id: string, dto: UpdateVideoDto) {
    const donorVideo = await this.videoRepository.findOne({where: {id: id}});
    if(donorVideo) {
      const newVideo = {
        ...donorVideo, 
        title: dto.title, 
        author: dto.author, 
        availableResolutions: dto.availableResolutions,
        minAgeRestriction: dto.minAgeRestriction,
        canBeDownloaded: dto.canBeDownloaded,
        publicationDate: dto.publicationDate,
      } 
      //await this.videoRepository.update(id, newVideo);
      return newVideo;
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteVideo(id: string) {
    const donorVideo = await this.videoRepository.findOne({where: {id: id}});
    if(donorVideo) {
      //await this.videoRepository.delete(id)
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }
  
}