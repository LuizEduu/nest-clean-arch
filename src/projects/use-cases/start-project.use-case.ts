import { StartProjectDto } from '../dto/start-project.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../repository/project.repository';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectsRepository.findById(id);

    project.start(input.started_at);

    await this.projectsRepository.update(project);

    return project;
  }
}
