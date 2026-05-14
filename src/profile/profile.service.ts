import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrent() {
    return this.prisma.profile.findFirst({ orderBy: { createdAt: 'desc' } });
  }

  async upsert(dto: UpsertProfileDto) {
    const existing = dto.id
      ? await this.prisma.profile.findUnique({ where: { id: dto.id } })
      : await this.getCurrent();

    const { id, ...data } = dto;

    if (!existing) {
      return this.prisma.profile.create({ data });
    }

    return this.prisma.profile.update({ where: { id: existing.id }, data });
  }

  async remove(id: string) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Profile not found');
    await this.prisma.profile.delete({ where: { id } });
    return { id };
  }
}

