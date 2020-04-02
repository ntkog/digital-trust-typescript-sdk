const { Claims, AssertionClaims, Address, Balance } = require('@santander/rp-client-typescript').Model
const { VerifiedIdClient, InitiateAuthorizeRequestBuilder, TokenRequestBuilder } = require('@santander/rp-client-typescript').Client

const resolve = require('path').resolve

const claims = new Claims()
claims.email().withEssential(true).withPurpose('email purpose')
claims.givenName().withIAL(2)
claims.lastYearMoneyIn().withPurpose('Last year money in purpose')

const assertionClaims = new AssertionClaims()
assertionClaims.age().gt(21).withPurpose('age purpose')
assertionClaims.address()
  .withAssertion(Address.postalCode().eq('MK9 1BB'))
  .withAssertion(Address.country().eq('UK'))
  .withPurpose('Address purpose')

assertionClaims.lastYearMoneyIn().withPurpose('Last year money in purpose')
  .withAssertion(Balance.amount().gt(200))


// tokenExample()
doInitAuthorize()

async function doInitAuthorize() {
  try {
    const verifyidclient = await VerifiedIdClient.createInstance({
      wellKnownURI: 'https://op-iamid-verifiedid-pro.e4ff.pro-eu-west-1.openshiftapps.com/.well-known/openid-configuration',
      privateJWK: resolve('./secrets/quick-jobs.json'),
      clientId: '835822af-ae41-4513-96b0-ec5b619b43a9'
    })
    await verifyidclient.setUpClient()
    const request = new InitiateAuthorizeRequestBuilder()
      .withRedirectURI('com.jobs://authorized')
      .withAssertionClaims(assertionClaims)
      .withClaims(claims)
      .withPurpose('top level purpose')
      .build()
    const initiateAuthorize = await verifyidclient.initiateAuthorize(request)
    console.log(`code verifier: ${initiateAuthorize.codeVerifier}`)
    console.log(`click here: ${initiateAuthorize.redirectionUri}`)
  } catch (e) {
    console.error(e)
  }
}

async function tokenExample() {
  try {
    // const verifyidclient = await VerifiedIdClient.createInstance({
    //   wellKnownURI: 'https://op-iamid-verifiedid-pro.e4ff.pro-eu-west-1.openshiftapps.com/.well-known/openid-configuration',
    //   privateJWK: resolve('./secrets/private.json'),
    //   clientId: 'TEST-2754efa75e8c4d11a6d7f95b90cd8e40-TEST'
    // })
    const verifyidclient = await VerifiedIdClient.createInstance({
      wellKnownURI: 'https://op-iamid-verifiedid-pro.e4ff.pro-eu-west-1.openshiftapps.com/.well-known/openid-configuration',
      privateJWK: resolve('./secrets/quick-jobs.json'),
      clientId: '835822af-ae41-4513-96b0-ec5b619b43a9'
    })
    await verifyidclient.setUpClient()
    const request = new TokenRequestBuilder()
      // .withRedirectUri('https://www.sainsburys.co.uk')
      .withRedirectUri('com.jobs://authorized')
      .withCodeVerifier('gekBHnGA5NLuX2z-fVNIrdpbPAFfUj0hthCwYPXji7d')
      .withCode('07G60dVyAmkUxcqI7YXd5TPwx2nA_GXhfLHWRxS69UG')
      .build()
    const token = await verifyidclient.token(request)
    console.log('token', token)
  } catch (e) {
    console.error(e)
  }
}
