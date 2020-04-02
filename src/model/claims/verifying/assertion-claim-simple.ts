import { AssertionClaim } from './assertion-claim'
import { Operator } from './operator'

export class AssertionClaimSimple<T> extends AssertionClaim {
  protected _operand: T
  protected _operator: Operator

  public get operand(): T {
    return this._operand
  }
  public get operator(): Operator {
    return this._operator
  }

  public equal(operand: T): AssertionClaimSimple<T> {
    this._operand = operand
    this._operator = Operator.EQUAL
    return this
  }
}
