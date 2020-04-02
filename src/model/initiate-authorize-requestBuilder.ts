import { AssertionClaims } from './claims/verifying/assertion-claims'
import { Claims } from './claims/sharing/claims'
import { InitiateAuthorizeRequest } from './initiate-authorize-request'

export class InitiateAuthorizeRequestBuilder {
  public redirectURI: string = undefined
  public assertionClaims: AssertionClaims = undefined
  public claims: Claims = undefined
  public state: string = undefined
  public purpose: string = undefined
  public codeChallenge: string = undefined
  public nonce: string = undefined

  public build(): InitiateAuthorizeRequest {
    return new InitiateAuthorizeRequest(
      this
    )
  }

  public withRedirectURI(value: string) {
    this.redirectURI = value
    return this
  }

  public withAssertionClaims(value: AssertionClaims) {
    this.assertionClaims = value
    return this
  }

  public withClaims(value: Claims) {
    this.claims = value
    return this
  }

  public withState(value: string) {
    this.state = value
    return this
  }

  public withPurpose(value: string) {
    this.purpose = value
    return this
  }

  public withCodeChallenge(value: string) {
    this.codeChallenge = value
    return this
  }

  public withNonce(value: string) {
    this.nonce = value
    return this
  }
}
