import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;
  @IsOptional()
  description: string;
  @IsString()
  link: string;
  @IsOptional()
  categories: number[];
}
