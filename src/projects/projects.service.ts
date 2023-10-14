import { BadRequestException, Injectable } from '@nestjs/common';
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

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOneOrFail({
      where: { id },
    });

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description &&
      (project.description = updateProjectDto.description);

    if (
      updateProjectDto.started_at &&
      [
        ProjectStatus.Active,
        ProjectStatus.Completed,
        ProjectStatus.Cancelled,
      ].includes(project.status)
    ) {
      throw new BadRequestException(
        `Cannot started an active, completed or cancelled project. actual status to project ${project.status}`,
      );
    }

    if (
      updateProjectDto.cancelled_at &&
      [ProjectStatus.Completed, ProjectStatus.Cancelled].includes(
        project.status,
      )
    ) {
      throw new BadRequestException(
        `Cannot cancelled an completed or cancelled project. actual status to project ${project.status}`,
      );
    }

    if (
      updateProjectDto.finished_at &&
      [ProjectStatus.Completed, ProjectStatus.Cancelled].includes(
        project.status,
      )
    ) {
      throw new BadRequestException(
        `Cannot finished an completed or cancelled project. actual status to project ${project.status}`,
      );
    }

    if (new Date(updateProjectDto?.started_at) < new Date()) {
      throw new BadRequestException(
        `Cannot started an project with started_at less than today`,
      );
    }

    if (
      new Date(updateProjectDto.finished_at) >
      new Date(updateProjectDto.started_at)
    ) {
      throw new BadRequestException(
        `Cannot finished an project with finished_at greater than started_at`,
      );
    }

    project.started_at = updateProjectDto.started_at ?? project.started_at;
    project.cancelled_at =
      updateProjectDto.cancelled_at ?? project.cancelled_at;
    project.finished_at = updateProjectDto.finished_at ?? project.finished_at;
    project.status =
      (updateProjectDto.started_at && ProjectStatus.Active) ||
      (updateProjectDto.cancelled_at && ProjectStatus.Cancelled) ||
      (updateProjectDto.finished_at && ProjectStatus.Completed);

    return this.projectsRepository.save(project);
  }

  async remove(id: number) {
    await this.projectsRepository.delete(id);
  }
}
