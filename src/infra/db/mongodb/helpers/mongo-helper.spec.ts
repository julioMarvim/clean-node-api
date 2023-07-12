import { MongoHelper as sut } from './mongo-helper'
import env from '../../../../main/config/env'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Shoud reconnect if mongoDb is down', async () => {
    let accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
  })
})
