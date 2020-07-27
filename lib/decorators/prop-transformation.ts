import { PropTransformer, TransformationMetadata }
    from '../types/prop-transformation'
import { Metadata } from '../core/metadata'

export function PropTransformation<T, K>(
    propTransformer: PropTransformer<T, K>
): PropertyDecorator  {
    return function (target: Object, propertyKey: string | symbol) {
        const klassName = target.constructor.name

        const metadata: TransformationMetadata<T, K> = {
            propertyKey: propertyKey.toString(),
            propTransform: propTransformer
        }

        Metadata.getInstance()
            .registerTransformationMetadata(klassName, metadata)
    }
}
