import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Video } from './videos.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { addDays } from '../../helpers/date';
import { VideoRepositoryTypeORM } from './video.repositoryTypeORM';

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepositoryTypeORM,
  ) {}

  async findAll() {
    return this.videoRepository.findAll();
  }

  async findOne(id) {
    return this.videoRepository.findOne(id);
  }

  async createVideo(dto: CreateVideoDto) {
    return this.videoRepository.createVideo(dto);
  }

  async updateVideo(id: number, dto: UpdateVideoDto) {
    return this.videoRepository.updateVideo(id, dto);
  }

  async deleteVideo(id: number) {
    return this.videoRepository.deleteVideo(id);
  }
  
}