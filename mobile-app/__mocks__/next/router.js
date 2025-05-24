// mobile-app/__mocks__/next/router.js
export const useRouter = () => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
});