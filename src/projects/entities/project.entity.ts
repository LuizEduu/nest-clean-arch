import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', nullable: true })
  started_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  finished_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  cancelled_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  forecasted_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
      finished_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (
      [
        ProjectStatus.Active,
        ProjectStatus.Completed,
        ProjectStatus.Cancelled,
      ].includes(this.status)
    ) {
      throw new Error(
        'Project an status active, completed or cancelled cannot be started',
      );
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
