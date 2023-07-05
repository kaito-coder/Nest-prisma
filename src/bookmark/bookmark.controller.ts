import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Post()
  @UseGuards(JwtGuard)
  createBookmark(@Body() bookmark: CreateBookmarkDto, @GetUser() user: User) {
    console.log(bookmark);

    return this.bookmarkService.createBookmark(bookmark, user);
  }
}
