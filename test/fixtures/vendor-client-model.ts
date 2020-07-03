import { Property, MapProperty } from '../../lib'

import { VendorModel } from './vendor-model'

export class VendorClient {

    @MapProperty(VendorModel, 'vendorName')
    @Property({ name: 'vendor_name ' })
    vendor: string

    @MapProperty(VendorModel, 'price')
    cost: number

    @Property()
    comment: string

}
