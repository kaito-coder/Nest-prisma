import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          address: {
            create: {
              street: dto.street,
              city: dto.city,
            },
          },
        },
        include: {
          address: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async login(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get('JWT-Secret');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('expiresIn'),
      secret: secret,
    });
    return { accessToken: token };
  }
}
