import { HttpClient } from './http-client'
import axios, { AxiosInstance } from 'axios'

export class HttpClientAxios implements HttpClient {

  private readonly http: AxiosInstance

  private constructor(http: AxiosInstance) {
    this.http = http
  }

  public static createInstance() {
    return new HttpClientAxios(axios.create())
  }

  public async callSimpleGET(url: string): Promise<string> {
    const response = await this.http.get(url)
    const status = response.status
    if (status === 200) {
      return response.data
    } else {
      throw new Error(`Response status: ${status}`)
    }
  }

  public async initiateAuthorize(url: string, auth: string, body: string): Promise<string> {
    const data = 'client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer'
      + `&client_assertion=${auth}`
      + `&request=${body}`
    const response = await this.http.post(url, data)
    const status = response.status
    if (status === 201) {
      return response.data
    } else {
      throw new Error(`Response status: ${status}`)
    }
  }

  public async token(
    url: string,
    clientAssertionToken: string,
    code: string,
    redirectUri: string,
    codeVerifier: string) {
    let data = `grant_type=authorization_code&code=${code}&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=${clientAssertionToken}&redirect_uri=${redirectUri}`
    if (codeVerifier) {
      data += `&code_verifier=${codeVerifier}`
    }
    const response = await this.http.post(url, data)

    const status = response.status
    if (status === 200) {
      return response.data
    } else {
      throw new Error(`Response status: ${status}`)
    }
  }
}