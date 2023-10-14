import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { StartProjectDto } from '../dto/start-project.dto';
import { Injectable } from '@nestjs/common';

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

    project.start(input.started_at);

    return this.projectsRepository.save(project);
  }
}
