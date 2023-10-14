import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { StartProjectDto } from '../dto/start-project.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectsRepository.findOneOrFail({
      where: { id: id },
    });

    if (
      [
        ProjectStatus.Active,
        ProjectStatus.Completed,
        ProjectStatus.Cancelled,
      ].includes(project.status)
    ) {
      throw new BadRequestException(
        'Project an status active, completed or cancelled cannot be started',
      );
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;

    return this.projectsRepository.save(project);
  }
}
