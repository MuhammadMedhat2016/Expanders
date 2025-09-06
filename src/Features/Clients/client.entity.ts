import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '../Projects/project.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  company_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contact_email!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date | null;

  @OneToMany(() => Project, (project) => project.client)
  projects!: Project[];
}
