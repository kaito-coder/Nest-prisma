import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { User } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  async createBookmark(dto: CreateBookmarkDto, user: User) {
    const categories = dto.categories?.map((category) => ({
      id: category,
    }));

    const bookmark = await this.prismaService.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        category: {
          connect: categories,
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        category: true,
        user: true,
      },
    });
    return bookmark;
  }
}
