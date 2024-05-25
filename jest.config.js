// jest.config.js
export default {
  testEnvironment: "node",

  preset: "@shelf/jest-mongodb",
  modulePathIgnorePatterns: ["data.json"],
};
