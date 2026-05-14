import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapProject(project: any) {
    return {
      ...project,
      skills: project.skills?.map((ps: any) => ps.skill) ?? [],
    };
  }

  async findAll() {
    const projects = await this.prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: { skills: { include: { skill: true } } },
    });
    return projects.map((p) => this.mapProject(p));
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { skills: { include: { skill: true } } },
    });
    if (!project) throw new NotFoundException('Project not found');
    return this.mapProject(project);
  }

  async create(dto: CreateProjectDto) {
    const { skillIds, ...data } = dto;
    const project = await this.prisma.project.create({
      data: {
        ...data,
        techStack: data.techStack ?? [],
        skills: skillIds?.length ? { create: skillIds.map((skillId) => ({ skillId })) } : undefined,
      },
      include: { skills: { include: { skill: true } } },
    });
    return this.mapProject(project);
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    const { skillIds, ...data } = dto;
    const project = await this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        skills: skillIds
          ? {
              deleteMany: {},
              create: skillIds.map((skillId) => ({ skillId })),
            }
          : undefined,
      },
      include: { skills: { include: { skill: true } } },
    });
    return this.mapProject(project);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { id };
  }
}

