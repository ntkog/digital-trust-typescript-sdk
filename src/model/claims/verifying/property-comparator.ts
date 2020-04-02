import { Operator } from './operator'
import { Property } from './property'

export class PropertyComparator<T> extends Property<T> {
  public gt(operand: T): PropertyComparator<T> {
    this._operand = operand
    this._operator = Operator.GREATER_THAN
    return this
  }
  public gte(operand: T): PropertyComparator<T> {
    this._operand = operand
    this._operator = Operator.GREATER_THAN_OR_EQUAL
    return this
  }
  public lt(operand: T): PropertyComparator<T> {
    this._operand = operand
    this._operator = Operator.LESS_THAN
    return this
  }
  public lte(operand: T): PropertyComparator<T> {
    this._operand = operand
    this._operator = Operator.LESS_THAN_OR_EQUAL
    return this
  }
}
