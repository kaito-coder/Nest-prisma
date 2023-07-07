import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { User } from '@prisma/client';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { log } from 'console';

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
  async getBookmarks() {
    return await this.prismaService.bookmark.findMany();
  }
  async getBookmark(id: number) {
    return await this.prismaService.bookmark.findUnique({
      where: {
        id,
      },
    });
  }
  async updateBookmark(id: number, bookmarkDto: UpdateBookmarkDto) {
    console.log(bookmarkDto.categories);
    console.log(typeof bookmarkDto.categories);

    const categories = bookmarkDto?.categories?.map((category) => ({
      id: category,
    }));

    const bookmark = await this.prismaService.bookmark.update({
      where: { id: id },
      data: {
        title: bookmarkDto.title,
        description: bookmarkDto.description,
        link: bookmarkDto.link,
        category: {
          set: categories,
        },
      },
      include: {
        category: true,
      },
    });
    return bookmark;
  }
  async deleteBookmark(id: number) {
    await this.prismaService.bookmark.delete({
      where: { id: id },
    });
  }
}
