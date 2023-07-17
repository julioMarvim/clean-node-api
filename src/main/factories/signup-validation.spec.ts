import { CompareFieldsValidation } from '../../presentation/helpers/validatiors/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validatiors/required-field-validation'
import { type Validation } from '../../presentation/helpers/validatiors/validation'
import { ValidationComposite } from '../../presentation/helpers/validatiors/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validatiors/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
