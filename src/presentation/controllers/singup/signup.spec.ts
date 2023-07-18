import { type AddAccount, type AddAccountModel, type AccountModel, type HttpRequest, type Validation } from './signup-protocols'
import { SignUpController } from './signup'
import { MissingParamError, ServerError } from '../../errors'
import { ok, serverError, badRequest } from '../../helpers/http/http-helper'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: SignUpController
  addAccounStub: AddAccount
  validationStup: Validation
}

const makeSut = (): SutTypes => {
  const addAccounStub = makeAddAccount()
  const validationStup = makeValidation()
  const sut = new SignUpController(addAccounStub, validationStup)

  return {
    sut,
    addAccounStub,
    validationStup
  }
}

describe('SignUp Controller', () => {
  test('Shoud call AddAccount with correct values', async () => {
    const { sut, addAccounStub } = makeSut()
    const addSpy = jest.spyOn(addAccounStub, 'add')

    await sut.handle(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Shoud return 500 if AddAccount throws', async () => {
    const { sut, addAccounStub } = makeSut()
    jest.spyOn(addAccounStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Shoud return 200 if an valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Shoud call Validation with correct values', async () => {
    const { sut, validationStup } = makeSut()
    const validateSpy = jest.spyOn(validationStup, 'validate')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Shoud return 400 if Validation returns an error', async () => {
    const { sut, validationStup } = makeSut()
    jest.spyOn(validationStup, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
