import { VendorModel } from '../fixtures/vendor-model'
import { VendorClient } from '../fixtures/vendor-client-model'
import { mapObject } from '../../lib'
import { Log, LogSummary } from '../fixtures/sample-map-nested-object'

describe('mapObject method', () => {
    describe('handle shallow objects', () => {
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

    describe('handle nested object', () => {
        const targetObject: Log = {
            builded: true,
            logs: ['hello', 'world']
        }

        // eslint-disable-next-line max-len
        it('should process the target object and update the property of the mapped object', () => {
            const expectedObject: LogSummary = {
                buildSummary: 'hello world'
            }

            expect(mapObject(LogSummary, Log, targetObject))
                .toEqual(expectedObject)
        })
    })
})
