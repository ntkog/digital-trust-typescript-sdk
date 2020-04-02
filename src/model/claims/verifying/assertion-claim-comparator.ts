import { AssertionClaimSimple } from './assertion-claim-simple'
import { Operator } from './operator'

export class AssertionClaimComparator<T> extends AssertionClaimSimple<T> {
  public gt(operand: T): AssertionClaimSimple<T> {
    this._operand = operand
    this._operator = Operator.GREATER_THAN
    return this
  }
  public gte(operand: T): AssertionClaimSimple<T> {
    this._operand = operand
    this._operator = Operator.GREATER_THAN_OR_EQUAL
    return this
  }
  public lt(operand: T): AssertionClaimSimple<T> {
    this._operand = operand
    this._operator = Operator.LESS_THAN
    return this
  }
  public lte(operand: T): AssertionClaimSimple<T> {
    this._operand = operand
    this._operator = Operator.LESS_THAN_OR_EQUAL
    return this
  }
}