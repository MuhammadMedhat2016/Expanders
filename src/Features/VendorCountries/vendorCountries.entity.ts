import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vendor } from '../Vendors/vendor.entity';
import { Country } from '../Countries/country.entity';
@Entity()
export class VendorCountries {
  @PrimaryColumn()
  vendor_id!: number;

  @PrimaryColumn()
  country_id!: number;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor!: Vendor;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country!: Country;
}
