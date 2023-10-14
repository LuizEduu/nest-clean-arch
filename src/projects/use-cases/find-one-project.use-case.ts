import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../repository/project.repository';

@Injectable()
export class FindOneProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository,
  ) {}

  execute(id: string) {
    return this.projectsRepository.findById(id);
  }
}
