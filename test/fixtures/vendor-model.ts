import { Property } from '../../lib'

export class VendorModel {

    @Property()
    vendorName: string

    @Property()
    price: number

    @Property()
    comment: string

    @Property({ nullable: true })
    confirmed?: boolean

}
