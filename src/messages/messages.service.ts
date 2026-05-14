import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const msg = await this.prisma.message.findUnique({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    return msg;
  }

  create(dto: CreateMessageDto) {
    return this.prisma.message.create({ data: dto });
  }

  async update(id: string, dto: UpdateMessageDto) {
    await this.findOne(id);
    return this.prisma.message.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.message.delete({ where: { id } });
    return { id };
  }
}

