module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\.js$': 'babel-jest',
  },
  testMatch: [
    '**/*.test.js'
  ],
  collectCoverageFrom: [
    'functions/**/*.js',
    '!functions/**/test.js'
  ],
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true,
  restoreMocks: true
};