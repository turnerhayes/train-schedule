module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: [
    'node_modules',
    'app',
  ],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/internals/mocks/image.js',
  },
  setupFiles: [
    '<rootDir>/internals/testing/shim.js',
    '<rootDir>/internals/testing/setup.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  testRegex: '\\.test\\.js$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/internals',
  ],
};
