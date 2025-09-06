import { PrimaryColumn, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { Vendor } from '../Vendors/vendors.entity';
import { Service } from '../Services/services.entity';

@Entity()
export class VendorServices {
  @PrimaryColumn()
  vendor_id!: number;

  @PrimaryColumn()
  service_id!: number;

  @JoinColumn({ name: 'vendor_id' })
  @ManyToOne(() => Vendor)
  vendor!: Vendor;

  @JoinColumn({ name: 'service_id' })
  @ManyToOne(() => Service)
  vendorService!: Vendor;
}
