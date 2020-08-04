import { Property } from '../../lib'
import { MapTransformer } from '../../lib/types'
import { MapAndTransformProperty } from '../../lib/decorators/map-property'

export class LogSummaryTransformer implements MapTransformer<Log, string > {

    transform(object: Log): string {
        const { builded, logs } = object

        return builded ? logs.join(' ') : 'No logs'
    }

}

export class Log {

    @Property()
    builded: boolean

    @Property()
    logs: string[]

}

export class LogSummary {

    @MapAndTransformProperty(Log, new LogSummaryTransformer())
    @Property()
    buildSummary: string

}
