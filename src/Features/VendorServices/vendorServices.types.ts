import { ServiceSelection } from "../Services/services.types";
import { VendorSelection } from "../Vendors/vendor.types";


export interface VendorServicesSelection {
    vendor_id?: boolean;
    service_id?: boolean;
    vendor?: VendorSelection | boolean;
    vendorService?: ServiceSelection | boolean;
}
