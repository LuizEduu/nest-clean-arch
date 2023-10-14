import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  execute(input: CreateProjectDto) {
    const project = new Project(input);

    if (new Date(input.started_at) <= new Date()) {
      project.status = ProjectStatus.Active;
    }

    return this.projectsRepository.save(project);
  }
}
