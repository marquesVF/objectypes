/* eslint-disable no-useless-constructor */
import { ClassConstructor } from './types/class-constructor'
import { Hashable } from './types/hashable'
import { isValid } from './validate'
import { buildObject } from './build-object'
import { extractObject } from './extract-object'

export class JsonMapper<T> {

    readonly errors: string[] = []

    constructor(
        private readonly klass: ClassConstructor<T>
    ) { }

    validate(obj: Hashable): boolean {
        const { valid, errors } = isValid(this.klass, obj)

        if (errors) {
            this.errors.push(...errors)
        }

        return valid
    }

    validationErrorSummary(separator?: string): string {
        const actualSeparator = separator ?? ', '

        return this.errors.join(actualSeparator)
    }

    build(jsonObj: object): T {
        return buildObject(this.klass, jsonObj)
    }

    extract(obj: T): object {
        return extractObject(obj, this.klass)
    }

}
