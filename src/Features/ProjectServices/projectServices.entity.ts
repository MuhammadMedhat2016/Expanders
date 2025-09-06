import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from '../Projects/project.entity';
import { Service } from '../Services/services.entity';

@Entity()
export class ProjectServices {
  @PrimaryColumn()
  project_id!: number;

  @PrimaryColumn()
  service_id!: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @ManyToOne(() => Service, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service!: Service;
}
