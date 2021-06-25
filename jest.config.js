module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
  },
}
