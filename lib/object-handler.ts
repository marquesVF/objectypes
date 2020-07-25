/* eslint-disable no-useless-constructor */
import { ClassConstructor } from './types/class-constructor'
import { Hashable } from './types/hashable'
import { buildObject } from './build-object'
import { extractObject } from './extract-object'
import { validateObject } from './validate-object'
import { ValidationResult } from './types/object-handler-validation'

export class ObjectHandler<T> {

    constructor(
        private readonly klass: ClassConstructor<T>
    ) { }

    validate(obj: Hashable): ValidationResult {
        const validationErrors = validateObject(this.klass, obj)

        return { valid: validationErrors.length === 0, validationErrors }
    }

    build(jsonObj: object): T {
        return buildObject(this.klass, jsonObj)
    }

    extract(obj: T): object {
        return extractObject(obj, this.klass)
    }

}
