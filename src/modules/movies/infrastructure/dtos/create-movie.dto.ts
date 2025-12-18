import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
    @ApiProperty({ example: 'A New Hope' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'George Lucas', required: false })
    @IsString()
    @IsOptional()
    director?: string;

    @ApiProperty({ example: 'Gary Kurtz', required: false })
    @IsString()
    @IsOptional()
    producer?: string;

    @ApiProperty({ example: 'It is a period of civil war...', required: false })
    @IsString()
    @IsOptional()
    opening_crawl?: string;

    @ApiProperty({ example: '1977-05-25', required: false })
    @IsString()
    @IsOptional()
    release_date?: string;
}