import { Inject, Injectable } from '@nestjs/common';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { VideoRepositoryTypeORM } from './video.repositoryTypeORM';
import { VideoRepositoryMongo } from './video.repositoryMongo';
import { IVideoRepositoryInterface } from './interface/repoInterface';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class VideoService {
  constructor(
    @Inject('Repository')
    private readonly videoRepository: IVideoRepositoryInterface,
  ) {}

  async findAll() {
    return this.videoRepository.findAll();
  }

  async findOne(id: string) {
    return this.videoRepository.findOne(id);
  }

  async createVideo(dto: CreateVideoDto) {
    return this.videoRepository.createVideo(dto);
  }

  async updateVideo(id: string, dto: UpdateVideoDto) {
    return this.videoRepository.updateVideo(id, dto);
  }

  async deleteVideo(id: string) {
    return this.videoRepository.deleteVideo(id);
  }
  
}