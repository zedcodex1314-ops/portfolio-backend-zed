import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UpsertProfileDto } from './dto/upsert-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getCurrent() {
    return this.profileService.getCurrent();
  }

  @Put()
  upsert(@Body() dto: UpsertProfileDto) {
    return this.profileService.upsert(dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.profileService.remove(id);
  }
}

