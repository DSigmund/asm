module.exports = function (config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    htmlReporter: {
      baseDir: 'docs/mutation' // this is the default
    },
    testRunner: 'jest',
    testFramework: 'jest',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts', '!src/**/*.test.ts']
  })
}
