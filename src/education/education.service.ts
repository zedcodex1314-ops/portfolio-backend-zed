import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.education.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.education.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Education not found');
    return item;
  }

  create(dto: CreateEducationDto) {
    return this.prisma.education.create({ data: dto });
  }

  async update(id: string, dto: UpdateEducationDto) {
    await this.findOne(id);
    return this.prisma.education.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.education.delete({ where: { id } });
    return { id };
  }
}

