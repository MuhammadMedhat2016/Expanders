import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Project } from '../Projects/project.entity';
@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @OneToMany(() => Project, (project) => project.country)
  project!: Project[]

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
