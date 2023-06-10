import { SignUpController } from './signup';

describe('SignUp Controller', () => {
	test('Shoud return 400 if no name is provided', () => {
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
		expect(httpResponse.body).toEqual(new Error('Missig param: name'));
	});

	test('Shoud return 400 if no email is provided', () => {
		const sut = new SignUpController();
		const httpRequest = {
			body: {
				name: 'any_name',
				password: 'any_pawwsord',
				passwordConfirmation: 'any_password'
			}
		};
		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new Error('Missig param: email'));
	});
});
