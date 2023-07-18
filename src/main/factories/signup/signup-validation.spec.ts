import { EmailValidation, ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '../../../presentation/helpers/validatiors'
import { type Validation } from '../../../presentation/protocols/validation'
import { type EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validatiors/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
