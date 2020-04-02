import { JWK, JWS } from 'node-jose'

export async function extractJWKFromString(asString: string): Promise<JWK.Key> {
  return await JWK.asKey(asString)
}

export async function sign(key: JWK.Key, payload: any): Promise<string> {
  let payloadAsString
  if (typeof payload === 'string') {
    payloadAsString = payload
  } else {
    payloadAsString = JSON.stringify(payload)
  }
  const signature = await JWS.createSign({ format: 'compact', fields: { typ: 'JWT' } }, key)
    .update(payloadAsString)
    .final()
  return signature.toString()
}

export async function verifySignature(jwks: JWK.KeyStore, jwt: string): Promise<any> {
  const payload = await JWS.createVerify(jwks)
    .verify(jwt)

  return JSON.parse(payload.payload.toString())
}
