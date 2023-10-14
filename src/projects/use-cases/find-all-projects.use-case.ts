import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../repository/project.repository';

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository,
  ) {}

  execute() {
    return this.projectsRepository.findAll();
  }
}
