import { Claims } from './model/claims/sharing/claims'
import { AssertionClaims } from './model/claims/verifying/assertion-claims'
import { Address } from './model/claims/verifying/address'
import { Balance } from './model/claims/verifying/balance'
import { VerifiedIdClient } from './verifyidclient'
import { InitiateAuthorizeRequestBuilder } from './model/initiate-authorize-requestBuilder'
import { TokenRequestBuilder } from './model/token/token-requestBuilder'

export const Model = {
  Claims,
  AssertionClaims,
  Balance,
  Address
}

export const Client = {
  VerifiedIdClient,
  InitiateAuthorizeRequestBuilder,
  TokenRequestBuilder
}