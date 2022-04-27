import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],
  testEnvironment: 'node',
  rootDir: './',
  roots: [
    '.'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/*.spec.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  setupFiles: [
    './jest.setup.ts'
  ],
  clearMocks: true
};

export default config;
