module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir/src/**/*.ts>'],
  coverageDirectory: 'coverage',
  testEviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
