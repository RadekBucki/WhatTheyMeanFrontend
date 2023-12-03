import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://127.0.0.1:5000'
  },
  testTimeout: 20000,
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupTests.ts'
  ],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS files
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_BASE_COMMUNICATION_URL: 'http://127.0.0.1:5000'
                  }
                }
              }
            }
          ]
        }
      }
    ]
  },
};
export default config;
