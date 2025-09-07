import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VendorCountries } from '../VendorCountries/vendorCountries.entity';
import { VendorServices } from '../VendorServices/vendorServices.entity';

@Entity()
@Check('vendor_rating_CK', 'rating >= 0 AND rating <= 5.0')
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating!: number;

  @Column({ type: 'int', unsigned: true })
  response_sla_hours!: number;

  @OneToMany(() => VendorCountries, (vendorCountry) => vendorCountry.vendor)
  countries!: VendorCountries[];

  @OneToMany(() => VendorServices, (vendorSerivce) => vendorSerivce.vendor)
  services!: VendorServices[];

  @UpdateDateColumn()
  updated_at!: Date;
  @CreateDateColumn()
  created_at!: Date;
}
