module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        jasmine: true,
        jest: true,
        node: true,
    },
    // Airbnb's ESLint config requires this
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        // Include .prettierrc.js rules
        'prettier/prettier': ['error', {}, { usePrettierrc: false }],
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',
        // We don't want unused vars
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
};
