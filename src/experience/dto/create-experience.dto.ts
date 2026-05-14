import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  company!: string;

  @IsString()
  role!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  companyLogoUrl?: string;

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}

