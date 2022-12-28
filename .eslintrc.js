module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@tanstack/query",
    "@typescript-eslint",
    "import",
    "jest",
    "jsx-a11y",
    "react",
    "react-hooks",
    "simple-import-sort",
    "testing-library",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-shadow": "error",
    "eol-last": ["error", "always"],
    indent: "off",
    "max-lines": [
      "error",
      {
        max: 500,
        skipBlankLines: true,
      },
    ],
    "max-params": ["warn", 3],
    "no-alert": "error",
    "no-extend-native": "error",
    "no-return-await": "error",
    "no-sync": "error",
    "no-throw-literal": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-destructuring": "warn",
    "prettier/prettier": "error",
    "react/jsx-no-leaked-render": "error",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "require-await": "error",
    semi: "off",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          // Packages. `react` related packages come first.
          ["^react", "^@?\\w"],
          // @vestfi packages.
          // Components.
          ["^(components|navigators|screens)(/.*|$)"],
          // Hooks.
          ["^(apis|context|hooks)(/.*|$)"],
          // Global utils.
          ["^(assets|constants|helpers|languages|utils)(/.*|$)"],
          // JSON imports.
          [".*.json$"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
    "import/ignore": ["react-native"],
  },
};
