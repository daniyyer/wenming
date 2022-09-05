module.exports = {
  // singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  proseWrap: "never",
  endOfLine: "auto",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.ejs",
      options: {
        parser: "html",
      },
    },
  ],
};
