import { Project } from '../entities/project.entity';

export interface IProjectRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  findById(id: string): Promise<Project>;
  findAll(): Promise<Project[]>;
}
