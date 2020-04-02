import nanoid from 'nanoid'

export class RequestHelper {
  public now(): number {
    return Math.floor(Date.now()/1000)
  }

  public random(): string {
    return nanoid(43)
  }
}