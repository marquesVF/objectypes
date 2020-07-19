import { TransformFunction, TransformationScope, TransformationMetadata }
    from '../types/transform-function'
import { Metadata } from '../utils/metadata'

export function PropTransformation<T, K>(
    fn: TransformFunction<T, K>,
    scope: TransformationScope
): PropertyDecorator  {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name
        const propKey = propertyKey.toString()

        const metadata: TransformationMetadata<T, K> = {
            fn,
            scope,
            propertyKey: propKey
        }

        Metadata.getInstance()
            .registerTransformationMetadata(klassName, metadata)
    }
}
