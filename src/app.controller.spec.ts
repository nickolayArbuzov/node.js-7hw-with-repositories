import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/infrastructure/filters/http-exeption.filter';
import { addDays } from './helpers/date';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  const blogController = '/blogs';
  const postController = '/posts';
  const videoController = '/videos';
  const testingController = '/testing';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const customErrors = [];
        errors.forEach(e => {
          const keys = Object.keys(e.constraints)
          keys.forEach(k => {
            customErrors.push({
              message: e.constraints[k],
              field: e.property,
            })
          })
        })
        throw new BadRequestException(customErrors)
      }
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  /*beforeEach(async () => {
    it('should delete all data in DB and return 204 status code', async () => {
      const url = `${testingController}/all-data`;
      const response = await request(app.getHttpServer()).delete(url);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  })*/

  afterAll(async () => {
    await app.close();
  });

  describe('/videos (POST)', () => {
    const videoUrl = `${videoController}`;

    it('create video , ', async () => {
      // add some services for prepare data in db
      const response = await request(app.getHttpServer())
        .post(videoUrl)
        .send({
          title: 'title', 
          author: 'author', 
          availableResolutions: ['P144']
        })
      console.log(response.body)
      console.log(addDays(response.body.createdAt, 1).toISOString())
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ 
        author: "author", 
        availableResolutions: ["P144"],
        createdAt: response.body.createdAt,
        minAgeRestriction: null,
        publicationDate: addDays(response.body.createdAt, 1).toISOString(),
        title: "title", 
      });
    });
    

  });
});
