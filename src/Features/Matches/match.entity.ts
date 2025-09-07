import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../Projects/project.entity';
import { Vendor } from '../Vendors/vendor.entity';
@Entity()
@Unique('project_vendor_UQ', ['project', 'vendor'])
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  project_id!: number;

  @Column()
  vendor_id!: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor!: Vendor;

  @Column({ type: 'decimal', scale: 2, precision: 4 })
  score!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
