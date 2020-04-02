import { AssertionClaims } from './claims/verifying/assertion-claims'
import { Claims } from './claims/sharing/claims'
import { InitiateAuthorizeRequestBuilder } from './initiate-authorize-requestBuilder'

export class InitiateAuthorizeRequest {
  private readonly _redirectURI: string
  private readonly _assertionClaims: AssertionClaims
  private readonly _claims: Claims
  private readonly _state: string
  private readonly _purpose: string
  private _clientId: string
  private _nonce: string
  private _codeChallenge: string

  constructor(builder: InitiateAuthorizeRequestBuilder) {
    this._redirectURI = builder.redirectURI
    this._assertionClaims = builder.assertionClaims
    this._claims = builder.claims
    this._state = builder.state
    this._purpose = builder.purpose
    this._codeChallenge = builder.codeChallenge
    this._nonce = builder.nonce
  }


  public get redirectURI(): string {
    return this._redirectURI
  }
  public get assertionClaims(): AssertionClaims {
    return this._assertionClaims
  }
  public get claims(): Claims {
    return this._claims
  }
  public get state(): string {
    return this._state
  }
  public get purpose(): string {
    return this._purpose
  }

  public get clientId(): string {
    return this._clientId
  }
  public set clientId(value: string) {
    this._clientId = value
  }
  public get codeChallenge(): string {
    return this._codeChallenge
  }
  public set codeChallenge(value: string) {
    this._codeChallenge = value
  }
  public get nonce(): string {
    return this._nonce
  }
  public set nonce(value: string) {
    this._nonce = value
  }
}