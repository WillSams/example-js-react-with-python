module.exports = {
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom-global',
  testMatch: ['**/specs/**/*.spec.js?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/specs/fileTransformer.js',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^axios$': 'axios/dist/node/axios.cjs',
  },
};
