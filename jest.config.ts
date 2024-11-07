import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/jest.config.ts',
    '!**/themes/**',
    '!<rootDir>/src/config/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/components/errors/index.ts',
    '!<rootDir>/src/actions/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/components/layout/index.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@/auth': '<rootDir>/__test__/mocks/auth.ts',
    'next-auth/providers/credentials':
      '<rootDir>/__test__/mocks/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/__test__/mocks/next-auth.ts',
    '@/services': '<rootDir>/src/services',
    '@/utils': '<rootDir>/src/utils',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
