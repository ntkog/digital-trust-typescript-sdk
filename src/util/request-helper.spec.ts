import { RequestHelper } from './request-helper'

describe('Request Helper', () => {
  const requestHelper: RequestHelper = new RequestHelper()
  describe('now', () => {
    it('should return a time in seconds from epoch', () => {
      expect(requestHelper.now()).toBeGreaterThan(1583770835)
    })
  })
  describe('random', () => {
    it('should return a 43 long string', () => {
      expect(requestHelper.random()).toHaveLength(43)
    })
  })
})