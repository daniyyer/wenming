"use strict";
/** @format */
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-rational-order",
    "stylelint-config-prettier",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-config-rational-order/plugin",
    "stylelint-scss",
    "stylelint-prettier",
  ],
  rules: {
    "no-descending-specificity": null,
    //https://github.com/stylelint/stylelint/issues/4114
    "function-calc-no-invalid": null,
    "font-family-no-missing-generic-family-keyword": null,
    "prettier/prettier": true,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "no-empty-source": null,
    "no-duplicate-selectors": null,
  },
  ignoreFiles: [
    "**/node_modules/**", // excluded directories
    "**/src/assets2/plugins/**",
  ],
};
