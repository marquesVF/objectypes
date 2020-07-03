import { VendorModel } from '../fixtures/vendor-model'
import { VendorClient } from '../fixtures/vendor-client-model'
import { mapObject } from '../../lib'

describe('mapObject method', () => {
    describe('shallow objects', () => {
        const vendor: VendorModel = {
            vendorName: 'Vini',
            comment: 'map object testing',
            price: 100
        }

        const vendorExpectedMapping: VendorClient = {
            vendor: 'Vini',
            comment: 'map object testing',
            cost: 100
        }

        const vendorMapObject = mapObject(VendorClient, VendorModel, vendor)

        it('should map the properties', () => {
            expect(vendorMapObject).toEqual(vendorExpectedMapping)
        })
    })
})
