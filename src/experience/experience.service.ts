import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Experience not found');
    return item;
  }

  create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({ data: dto });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.experience.delete({ where: { id } });
    return { id };
  }
}

