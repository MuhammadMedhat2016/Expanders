// create table project_services(
// 	project_id INT unsigned,
//     service_id INT unsigned,
//     created_at timestamp default now(),
//     constraint project_services__projects_FK foreign key (project_id) references projects(id) on delete cascade on update cascade,
//     constraint project_services__services_FK foreign key (service_id) references services(id)  on delete cascade on update cascade,
//     primary key (project_id, service_id)
// );

import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from './Projects';
import { Service } from './Services';

@Entity()
export class ProjectServices {
  @PrimaryColumn()
  project_id!: number;

  @PrimaryColumn()
  service_id!: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @ManyToOne(() => Service, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service!: Service;
}
