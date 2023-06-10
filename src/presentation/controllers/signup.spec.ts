import { SignUpController } from './signup';

describe('SignUp Controller', () => {
	test('Shoud return 400 if no name is provideed', () => {
		const sut = new SignUpController();
		const httpRequest = {
			body: {
				email: 'any_email@mail.com',
				password: 'any_pawwsord',
				passwordConfirmation: 'any_password'
			}
		};
		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
	});
});
