import { AssertionClaim } from './assertion-claim'
import { Property } from './property'

export class AssertionClaimComplex extends AssertionClaim {
  private _properties: any[] = []
  public get properties(): any[] {
    return this._properties
  }
  public withAssertion<T>(property: Property<T>): AssertionClaimComplex {
    this._properties.push(property)
    return this
  }
}
