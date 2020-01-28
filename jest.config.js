module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      diagnostics: { warnOnly: true }
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node'
};
