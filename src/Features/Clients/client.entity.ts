import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  Unique,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Project } from '../Projects/project.entity';
import { User } from '../Users/user.entity';

@Entity()
@Unique('contact_email_UQ', ['contact_email'])
export class Client {
  @PrimaryColumn()
  user_id!: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255, nullable: false })
  company_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contact_email!: string;

  @OneToMany(() => Project, (project) => project.client)
  projects!: Project[];
}
