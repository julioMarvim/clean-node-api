import {
  type UpdateAccessTokenRepository,
  type LoadAccountByEmailRepository,
  type TokenGenerator,
  type HashComparer,
  type AuthenticationModel,
  type Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const { password, id } = account
      const isValid = await this.hashComparer.compare(authentication.password, password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(id)
        await this.updateAccessTokenRepository.update(id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
