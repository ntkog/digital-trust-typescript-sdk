import { TokenRequestBuilder } from './token-requestBuilder'

export class TokenRequest {
    private readonly _code: string
    private readonly _clientAssertionType: string
    private readonly _redirectUri: string
    private readonly _grantType: string
    private readonly _nonce: string
    private readonly _codeVerifier: string

    public constructor(builder: TokenRequestBuilder) {
        this._code = builder.code
        this._clientAssertionType = builder.clientAssertionType
        this._redirectUri = builder.redirectUri
        this._grantType = builder.grantType
        this._nonce = builder.nonce
        this._codeVerifier = builder.codeVerifier
    }
    public get code(): string {
        return this._code
    }
    public get redirectUri(): string {
        return this._redirectUri
    }
    public get nonce() : string {
        return this._nonce
    }
    public get codeVerifier(): string {
        return this._codeVerifier
    }
}
