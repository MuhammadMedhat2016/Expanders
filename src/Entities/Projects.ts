import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { ProjectServices } from './ProjectServices';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  country!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  budget!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Client, (client) => client.id)
  client!: number;

  @OneToMany(() => ProjectServices, (projectService) => projectService.project)
  services!: ProjectServices[];
}
