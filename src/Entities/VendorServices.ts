// create table vendor_services(
// 	vendor_id INT unsigned,
//     service_id INT unsigned,
//     constraint vendors_services__serivces_FK foreign key (service_id) references services(id) on delete cascade on update cascade,
// 	constraint vendors_services__vendors_FK foreign key (vendor_id) references vendors(id) on delete cascade on update cascade,
//     primary key (vendor_id, service_id)
// );
import { PrimaryColumn, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { Vendor } from './Vendors';
import { Service } from './Services';

@Entity()
export class VendorServices {
  @PrimaryColumn()
  vendor_id!: number;

  @PrimaryColumn()
  service_id!: number;

  @JoinColumn({ name: 'vendor_id' })
  @ManyToOne(() => Vendor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  vendor!: Vendor;

  @JoinColumn({ name: 'service_id' })
  @ManyToOne(() => Service, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  service!: Service;
}
