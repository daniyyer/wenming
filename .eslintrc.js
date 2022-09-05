module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: "babel-eslint",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
  extends: ["plugin:prettier/recommended"],
  ignorePatterns: [
    "**/node_modules/**", // excluded directories
    "**/src/assets2/plugins/**",
  ],
};
