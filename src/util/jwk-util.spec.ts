import { extractJWKFromString, sign, verifySignature } from './jwk-util'
import { JWK } from 'node-jose'
import { Constants } from '../test-resources/constants'

describe('jwk-util', () => {
  describe('extractJWKFromString', () => {
    it('should read the JWK', async () => {
      const jwk = await extractJWKFromString(require('../test-resources/private-jwk.json'))
      expect(jwk.kid).toEqual('test-key')
      expect(jwk.kty).toEqual('RSA')
    })
  })
  describe('sign', () => {
    let key
    beforeEach(async (done) => {
      key = await extractJWKFromString(require('../test-resources/private-jwk.json'))
      done()
    })

    it('shoudl sign JSON payload', async () => {
      const signature = await sign(key, { field: 'value' })
      expect(signature).toEqual('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InRlc3Qta2V5In0.eyJmaWVsZCI6InZhbHVlIn0.IvW_9YHAt7-39-2V068-ZNvpyC29FbGmQfP6oWaPzw_yyzDYqwyxdW89DMo7GL082ENTJbgBPc18ZcDJV_47vKusizZAuMuf__RAa8wD9r1bgjhT9jPPBj9YjTaESk3mFVB1a4jLDP9N4s3A787SzuNd5WPfzjjBL5MEAgPP8iKlNNyl8DgE7AaZ-Sc6ue-ZTgqsAkWkRwM3Jtr2-GTIsV17EzqnTw5cAJSwPChy0wI5RdRIRUvaDTyfBm4zLAXQidH3ro45ha-LDIIpmLYNDxiPCBtf-cgXqlUPaYa8TyNj2pynsmDoU7Af3vfs9rwQbzmawVBPOtotW7jCtDiMYw')
    })
    it('shoudl sign string payload', async () => {
      const signature = await sign(key, 'hello')
      expect(signature).toEqual('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InRlc3Qta2V5In0.aGVsbG8.S9RKA1dfu2gKiJzPAf6rrqkjwCSEfgxPT9c95NU1NQKH7xws5-VBP4M6PAiLs8sJIsuWaWygGlK3Z4foRWwGWIoHCVWsg_V1yI89XX-1AapKN7otBQjkX-s7TWF6kS1IHzdUXXXTMr8LWm5WaPKELsBV6de4XRDP2_TfEcv-ikU4aexlph9YOxMN1_8u0lLB4qXcYh_ragI6llnGGb3dP_THfkjFhOGdsABqKZ8zSJ0jEOUJF0uRMmFbL-V7q_z3id_-suWEWW1k2D3fh6xv85CHjOdX9sN1ukm-COEhwMVbLbxc9Hxynon6Cr6uy9EHgXKrM1R9x1IdP5-ZxgWlBA')
    })
  })

  describe('verifySignature', () => {
    let jwk

    beforeEach(async (done) => {
      jwk = await JWK.asKeyStore(require('../test-resources/jwks.json'))
      done()
    })
    it('should successfuly return the decoded payload when a signature is verified', async (done) => {
      const verification = await verifySignature(jwk, Constants.verifySignatureJwt)

      expect(verification).toEqual(
        {
          'sub': '5516f02764c1122b5d76d737c911988d8b63173c6342be21b60929ac3dd34975',
          'txn': 'oPFDpCSRT76Rm5npJoNOc',
          'assertion_claims': { 'age': { 'result': true }, 'address': { 'result': true }, 'total_balance': { 'result': true } },
          'phone_number': '+4423243092111',
          'nonce': 'tdsdw',
          'at_hash': '_A_aUy5h73ikYJzSIqWa7A',
          'aud': 'udKQtdkZguierAjQFy58e',
          'exp': 1583489557,
          'iat': 1583488957,
          'iss': 'https://op.iamid.io'
        }
      )
      done()
    })

    it('should reject when a signature is not verified', async (done) => {
      await expect(verifySignature(jwk, Constants.failingVerifySignatureJwt))
        .rejects.toEqual(new Error('no key found'))

      done()
    })
  })
})