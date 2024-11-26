import { Controller, Get, Route, Tags } from 'tsoa';
import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

@Route('tags')
@Tags('Tag')
export class TagController extends Controller {

    @Get('/')
    public async getTags(): Promise<Tag[]> {
      return await prisma.tag.findMany({
        include: {
          posts: true,
        },
      });
    }
  }