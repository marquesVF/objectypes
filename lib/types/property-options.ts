import { ClassConstructor } from './class-constructor'

export interface PropertyOptions {
    name?: string
    type?: ClassConstructor<any>
}
