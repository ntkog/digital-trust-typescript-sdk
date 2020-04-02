import { Operator } from './operator'

export class Property<T> {
  protected _operand: T
  protected _operator: Operator
  private _propertyName: string

  public constructor(propertyName: string) {
    this._propertyName = propertyName
  }

  public get operand(): T {
    return this._operand
  }
  public get operator(): Operator {
    return this._operator
  }

  public get propertyName(): string {
    return this._propertyName
  }

  public eq(operand: T): Property<T> {
    this._operand = operand
    this._operator = Operator.EQUAL
    return this
  }
}
