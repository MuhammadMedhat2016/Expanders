import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { User } from '../Users/user.entity';

@Entity()
@Unique('contact_email_UQ', ['contact_email'])
export class Admin {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  admin!: Admin;

  @PrimaryColumn()
  user_id!: number;

  @Column()
  name!: string;

  @Column()
  contact_email!: string;
}
