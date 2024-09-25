import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
}));
