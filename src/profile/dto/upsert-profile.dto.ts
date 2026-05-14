import { IsEmail, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class UpsertProfileDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  websiteUrl?: string;
}

