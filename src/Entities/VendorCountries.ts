import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vendor } from './Vendors';
import { Country } from './Country';
@Entity()
export class VendorCountries {
  @PrimaryColumn()
  vendor_id!: number;

  @PrimaryColumn()
  country_id!: number;

  @JoinColumn({ name: 'vendor_id' })
  @ManyToOne(() => Vendor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  vendor!: Vendor;

  @JoinColumn({ name: 'country_id' })
  @ManyToOne(() => Country, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  country!: Country;
}
