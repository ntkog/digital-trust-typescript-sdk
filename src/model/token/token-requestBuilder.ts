import { TokenRequest } from './token-request'

export class TokenRequestBuilder {
    public grantType = 'authorization'
    public code: string
    public clientAssertionType = 'client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer'
    public clientAssertionToken: string
    public redirectUri: string
    public nonce: string
    public codeVerifier: string

    public build(): TokenRequest {
        return new TokenRequest(this)
    }

    public withCode(value: string) {
        this.code = value
        return this
    }

    public withRedirectUri(value: string) {
        this.redirectUri = value
        return this
    }

    public withNonce(value: string) {
        this.nonce = value
        return this
    }

    public withCodeVerifier(value: string) {
        this.codeVerifier = value
        return this
    }
}
