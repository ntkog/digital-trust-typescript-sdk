import { JWK } from 'node-jose'

export class OPConfiguration {
  public initAuthorizeEndpoint: string
  public authorizationEndpoint: string
  public tokenEndpoint: string
  public issuer: string
  public jwksUri: string
  public jwks: JWK.KeyStore
}