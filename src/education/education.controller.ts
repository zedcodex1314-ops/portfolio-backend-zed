import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { EducationService } from "./education.service";

@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.educationService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEducationDto) {
    return this.educationService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateEducationDto,
  ) {
    return this.educationService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.educationService.remove(id);
  }
}
