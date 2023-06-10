export default {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	preset: 'ts-jest',
};
