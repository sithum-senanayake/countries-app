module.exports = {
  testEnvironment: "jsdom", // Or "node" if needed
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Make sure it handles .jsx files
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"], // Add "jsx"
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
