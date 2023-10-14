import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../repository/project.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository,
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input);

    await this.projectsRepository.create(project);

    return project;
  }
}
