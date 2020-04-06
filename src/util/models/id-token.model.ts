export interface IdToken {
    audience: string
    nonce: string
    sub: string
    iss: string
    exp: string
    iat: string
    jti: string
    assertion_claims
    certified_claims: {
        [key: string]: {
            entity: string,
            loa: number,
            value: any
        }
    }
    at_hash: string
    email?: string
    family_name?: string
    given_name?: string
    age?: number
    birthdate?: Date
    total_balance?: {
        props?: {
            currency?: string,
            amount?: number
        }
    }
    address?: {
        props?: {
            formatted?: string
            street_address?: string
            locality?: string
            region?: string
            postal_code?: string
            country?: string
        }
    }
}