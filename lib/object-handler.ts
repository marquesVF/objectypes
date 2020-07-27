/* eslint-disable no-useless-constructor */
import { Hashable } from './types/hashable'
import { buildObject } from './build-object'
import { extractObject } from './extract-object'
import { validateObject } from './validate-object'
import { ClassConstructor, ValidationResult } from './types'

export class ObjectHandler<T> {

    constructor(
        private readonly klass: ClassConstructor<T>
    ) { }

    validate(obj: Hashable): ValidationResult {
        const { presenceErrors, typeErrors } = validateObject(this.klass, obj)
        const valid = presenceErrors.length === 0 && typeErrors.length === 0

        return { valid, presenceErrors, typeErrors }
    }

    build(jsonObj: object): T {
        return buildObject(this.klass, jsonObj)
    }

    extract(obj: T): object {
        return extractObject(obj, this.klass)
    }

}
