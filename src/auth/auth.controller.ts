import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { type } from 'os';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
  @Get('test')
  @UseGuards(JwtGuard)
  test(@GetUser() user: User) {
    console.log(user);
    return 'test';
  }
}
