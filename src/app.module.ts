import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { MessagesModule } from './messages/messages.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProfileModule,
    SkillsModule,
    ProjectsModule,
    ExperienceModule,
    EducationModule,
    MessagesModule,
  ],
})
export class AppModule {}

