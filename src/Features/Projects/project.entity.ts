import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../Clients/client.entity';
import { ProjectServices } from '../ProjectServices/projectServices.entity';
import { Country } from '../Countries/country.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  budget!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  status!: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client!: Client;
  
  @Column()
  client_id!: number;

  @OneToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @Column()
  country_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ProjectServices, (projectService) => projectService.project)
  services!: ProjectServices[];
}
