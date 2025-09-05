import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VendorCountries } from './VendorCountries';

@Entity()
@Check('rating_CK', 'rating >= 0 AND rating <= 5.0')
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'float', default: 0 })
  rating!: number;

  @Column({ type: 'int', unsigned: true })
  response_sla_hours!: number;

  @OneToMany(() => VendorCountries, (vendorCountry) => vendorCountry.country)
  countries!: VendorCountries[];

  @UpdateDateColumn()
  updated_at!: Date;
  @CreateDateColumn()
  created_at!: Date;
}
