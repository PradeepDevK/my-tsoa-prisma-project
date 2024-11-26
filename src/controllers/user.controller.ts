import { Controller, Route, Get, Tags } from "tsoa";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

@Route("users")
@Tags("User")
export class UserController extends Controller {

    @Get("/")
    public async getUsers(): Promise<User[]> {
        return await prisma.user.findMany({
            include: {
              posts: true,  // Include associated posts in the response
            }
          });
    }

    @Get("/:id")
    public async getUser(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                posts: true,
            }
        });
    }
}