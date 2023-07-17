import { CompareFieldsValidation } from '../../presentation/helpers/validatiors/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validatiors/email-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { type Validation } from '../../presentation/helpers/validatiors/validation'
import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { type EmailValidator } from '../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validatiors/validation-composite')

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
