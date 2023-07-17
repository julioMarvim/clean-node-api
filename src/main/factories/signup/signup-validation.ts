import { CompareFieldsValidation } from '../../../presentation/helpers/validatiors/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validatiors/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validatiors/required-field-validation'
import { type Validation } from '../../../presentation/helpers/validatiors/validation'
import { ValidationComposite } from '../../../presentation/helpers/validatiors/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
