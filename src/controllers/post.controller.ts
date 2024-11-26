import { Controller, Route, Get, Tags, Post, Body }  from "tsoa";
import { PrismaClient, Post as PrismaPost, User, Tag } from "@prisma/client";

const prisma = new PrismaClient();

@Route('posts')
@Tags("Post")
export class PostController extends Controller {

    @Get("/")
    public async getPosts(): Promise<PrismaPost []> {
        return await prisma.post.findMany({
            include: {
              user: true,  // Include the associated user
              tags: true,  // Include tags for each post
            },
        });
    }

    @Post("/")
    public async createPost(@Body() body: { title: string, content: string, userId: number, tagIds: number[] }): Promise<PrismaPost> {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                userId: body.userId,
                tags: {
                  connect: body.tagIds.map((id) => ({ id })),
                },
            },
        });

        return post;
    }
}