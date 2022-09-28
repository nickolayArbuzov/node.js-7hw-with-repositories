import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { addDays } from '../../helpers/date';
import { Model } from 'mongoose';
import { VideoModel } from './schema/video.interface';
import { IVideoRepositoryInterface } from './interface/repoInterface';


@Injectable()
export class VideoRepositoryMongo implements IVideoRepositoryInterface {
  constructor(
    @Inject('VIDEO_MONGOOSE')
    private videoRepository: Model<VideoModel>,
  ) {}

  async findAll() {
    return this.videoRepository.find();
  }

  async findOne(id: string) {
    const donorVideo = await this.videoRepository.findOne({id: id});
    if(donorVideo) {
      return donorVideo
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }

  async createVideo(dto: CreateVideoDto) {
    let date = new Date
    const video = new this.videoRepository({
      title: dto.title,
      author: dto.author,
      availableResolutions: dto.availableResolutions,
      minAgeRestriction: null,
      publicationDate: addDays(date, 1).toISOString(),
      createdAt: date.toISOString(),
    })
    await video.save()
    return {
      title: video.title, 
      author: video.author,
      availableResolutions: video.availableResolutions,
      minAgeRestriction: video.minAgeRestriction,
      publicationDate: video.publicationDate,        
      createdAt: video.createdAt,
      id: video._id,
    };
  }

  async updateVideo(id: string, dto: UpdateVideoDto) {
    const donorVideo = await this.videoRepository.findOne({id: id});
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
      await this.videoRepository.updateOne({id: id}, newVideo);
      return newVideo;
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteVideo(id: string) {
    const donorVideo = await this.videoRepository.findOne({id: id});
    if(donorVideo) {
      await this.videoRepository.deleteOne({id: id})
    } else {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
  }
  
}