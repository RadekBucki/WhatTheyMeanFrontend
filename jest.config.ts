import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupTests.ts'
  ],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS files
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Handle TypeScript files
  },
};

export default config;
