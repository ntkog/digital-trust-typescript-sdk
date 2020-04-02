import { Property } from './property'
import { PropertyComparator } from './property-comparator'

export class Balance {
  public static currency(): Property<string> {
    return new Property<string>('currency')
  }
  public static amount(): PropertyComparator<number> {
    return new PropertyComparator<number>('amount')
  }
}
