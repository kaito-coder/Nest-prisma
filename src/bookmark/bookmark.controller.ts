import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Post()
  @UseGuards(JwtGuard)
  createBookmark(@Body() bookmark: CreateBookmarkDto, @GetUser() user: User) {
    console.log(bookmark);

    return this.bookmarkService.createBookmark(bookmark, user);
  }
  @Get()
  getBookmarks() {
    return this.bookmarkService.getBookmarks();
  }
  @Get('/:bookmarkId')
  getBookmark(@Param('bookmarkId', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.getBookmark(bookmarkId);
  }

  @Patch('/:bookmarkId')
  updateBookmark(
    @Param('bookmarkId', ParseIntPipe) bookmarkId: number,
    @Body() bookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(bookmarkId, bookmarkDto);
  }
  @Delete('/:bookmarkId')
  deleteBookmark(@Param('bookmarkId', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.deleteBookmark(bookmarkId);
  }
}
