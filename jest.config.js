/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setup-test.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    "node_modules/(?!axios)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
