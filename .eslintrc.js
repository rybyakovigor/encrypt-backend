module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'sonarjs',
    '@darraghor/nestjs-typed'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    "plugin:sonarjs/recommended",
    'plugin:@darraghor/nestjs-typed/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': ["error", { allow: ["warn", "error"] }],
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/naming-convention': 'off'
  },
};

