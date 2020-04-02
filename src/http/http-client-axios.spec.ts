import { HttpClientAxios } from './http-client-axios'
import { mock, when, anyString, verify, instance } from 'ts-mockito'
import { AxiosInstance } from 'axios'

describe('HttpClientAxios', () => {

  let httpClient: HttpClientAxios

  const axiosMock: AxiosInstance = mock<AxiosInstance>()
  const axios: AxiosInstance = instance(axiosMock)

  beforeEach(() => {
    httpClient = HttpClientAxios.createInstance()
    // @ts-ignore
    httpClient.http = axios
  })

  describe('callSimpleGET', () => {
    it('should succeed if backend returns JSON payload with 200', async () => {
      when(axiosMock.get(anyString()))
        .thenResolve({
          status: 200,
          data: require('../test-resources/wellKnown.json')
        } as any
        )
      await expect(
        httpClient.callSimpleGET('https://op.iamid.io/.well-known/openid-configuration')
      )
        .resolves.toEqual(require('../test-resources/wellKnown.json'))
      verify(axiosMock.get('https://op.iamid.io/.well-known/openid-configuration')).called()
    })

    it('should fail if backend returns JSON payload with 404', async () => {
      when(axiosMock.get(anyString()))
        .thenResolve({
          status: 404,
          data: require('../test-resources/wellKnown.json')
        } as any
        )
      await expect(
        httpClient.callSimpleGET('https://op.iamid.io/.well-known/openid-configuration')
      )
        .rejects.toEqual(new Error('Response status: 404'))
      verify(axiosMock.get('https://op.iamid.io/.well-known/openid-configuration')).called()
    })
  })

  describe('initiateAuthorize', () => {
    it('should succeed if backend returns a JSON payload with a 201 response', async () => {
      when(axiosMock.post(anyString(), anyString()))
        .thenResolve({
          status: 201,
          data: require('../test-resources/init.authorize/response.json')
        } as any
        )
      await expect(
        httpClient.initiateAuthorize('https://op.iamid.io/initiate-authorize', 'auth', 'body')
      )
        .resolves.toEqual(require('../test-resources/init.authorize/response.json'))
      verify(axiosMock.post('https://op.iamid.io/initiate-authorize', 'client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=auth&request=body')).called()
    })

    it('should fail if backend returns a JSON payload with a 401 response', async () => {
      when(axiosMock.post(anyString(), anyString()))
        .thenResolve({
          status: 401,
          data: require('../test-resources/init.authorize/response.json')
        } as any
        )
      await expect(
        httpClient.initiateAuthorize('https://op.iamid.io/initiate-authorize', 'auth', 'body')
      )
        .rejects.toEqual(new Error('Response status: 401'))
      verify(axiosMock.post('https://op.iamid.io/initiate-authorize', 'client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=auth&request=body')).called()
    })
  })

  describe('token', () => {
    describe('when codeVerifier is not passed', () => {
      it('should succeed if backend returns a JSON payload with a 200 response', async () => {
        when(axiosMock.post(anyString(), anyString()))
          .thenResolve({
            status: 200,
            data: require('../test-resources/token/token-response.json')
          } as any
          )
        await expect(
          httpClient.token('https://op.iamid.io/token', 'auth', 'codeVerifier', 'https://callback.com/', undefined)
        ).resolves.toEqual(require('../test-resources/token/token-response.json'))
        verify(axiosMock.post('https://op.iamid.io/token', 'grant_type=authorization_code&code=codeVerifier&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=auth&redirect_uri=https://callback.com/')).called()
      })
      it('should fails if backend returns a JSON payload with a 401 response', async () => {
        when(axiosMock.post(anyString(), anyString()))
          .thenResolve({
            status: 401,
            data: require('../test-resources/token/token-response.json')
          } as any
          )
        await expect(
          httpClient.token('https://op.iamid.io/token', 'auth', 'codeVerifier', 'https://callback.com/', undefined)
        ).rejects.toEqual(new Error('Response status: 401'))
        verify(axiosMock.post('https://op.iamid.io/token', 'grant_type=authorization_code&code=codeVerifier&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=auth&redirect_uri=https://callback.com/')).called()
      })
    })
    describe('when codeVerifier is passed', () => {
      it('should succeed if backend returns a JSON payload with a 200 response', async () => {
        when(axiosMock.post(anyString(), anyString()))
          .thenResolve({
            status: 200,
            data: require('../test-resources/token/token-response.json')
          } as any
          )
        await expect(
          httpClient.token('https://op.iamid.io/token', 'auth', 'codeVerifier', 'https://callback.com/', 'verifier-1111')
        ).resolves.toEqual(require('../test-resources/token/token-response.json'))
        verify(axiosMock.post('https://op.iamid.io/token', 'grant_type=authorization_code&code=codeVerifier&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=auth&redirect_uri=https://callback.com/&code_verifier=verifier-1111')).called()
      })
    })
  })
})