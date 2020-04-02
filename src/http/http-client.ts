export interface HttpClient {
  token(url: string, auth: string, code: string, redirectUri?: string, codeVerifier?: string)
  callSimpleGET(url: string): any
  initiateAuthorize(url: string, auth: string, body: string): any
}