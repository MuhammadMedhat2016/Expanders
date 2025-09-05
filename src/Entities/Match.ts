// create table matches (
// 	id INT unsigned auto_increment PRIMARY KEY,
//     project_id INT unsigned,
//     vendor_id INT UNSIGNED,
//     score float,
//     created_at timestamp default CURRENT_TIMESTAMP,
//     constraint matches__projects_FK FOREIGN KEY (project_id) REFERENCES projects(id),
//     constraint matches__vendors_FK FOREIGN KEY (vendor_id) REFERENCES vendors(id)
// );

import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { Project } from './Projects';
import { Vendor } from './Vendors';
@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project)
  project!: number;

  @ManyToOne(() => Vendor)
  vendor!: number;
  @Column({ type: 'float' })
  score!: number;

  @CreateDateColumn()
  created_at!: Date;
}
