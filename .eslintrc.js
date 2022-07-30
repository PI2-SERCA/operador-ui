module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
    "plugin:@typescript-eslint/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
      "react/destructuring-assignment": 0,
      "react/jsx-props-no-spreading" : 0,
      "import/extensions": [
          "error",
          "ignorePackages",
          {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
          }
      ],
      "import/prefer-default-export": "off",
      "react/jsx-filename-extension": [0],
      "react/function-component-definition": [
          2,
          {
              "namedComponents": ["function-declaration", "arrow-function"],
              "unnamedComponents": "arrow-function"
          }
      ],
      "react/react-in-jsx-scope": "off",
      "indent": "off",
      "react/jsx-indent": "off",
      "jsx-quotes": ['error', "prefer-single"],
      "react/jsx-indent-props": "off",
      "object-curly-spacing": 0
  },
};
