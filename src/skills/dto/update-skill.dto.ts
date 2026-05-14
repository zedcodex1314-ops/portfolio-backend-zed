import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class UpdateSkillDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  level?: number;

  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}

