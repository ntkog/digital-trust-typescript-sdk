import { Property } from './property'

export class Address {
    public static formatted(): Property<string> {
        return new Property<string>('formatted')
    }

    public static streetAddress(): Property<string> {
        return new Property<string>('street_address')
    }

    public static locality(): Property<string> {
        return new Property<string>('locality')
    }

    public static region(): Property<string> {
        return new Property<string>('region')
    }

    public static postalCode(): Property<string> {
        return new Property<string>('postal_code')
    }

    public static country(): Property<string> {
        return new Property<string>('country')
    }
}