module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coverageDirectory: 'docs/coverage',
  reporters: [
    'default',
    ['jest-html-reporters', {
      'publicPath': './docs',
      'filename': 'test-report.html'
    }]
  ]
}
