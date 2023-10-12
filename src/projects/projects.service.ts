import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if (new Date(createProjectDto.started_at) <= new Date()) {
      project.status = ProjectStatus.Active;
    }

    return this.projectsRepository.save(project);
  }

  async findAll() {
    return this.projectsRepository.find();
  }

  async findOne(id: string) {
    return this.projectsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    await this.projectsRepository.delete(id);
  }
}
