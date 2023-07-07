import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookmarkDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  link: string;
  @IsOptional()
  categories: number[];
}
