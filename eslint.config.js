import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // 在这里添加您想要的自定义规则
        'react/react-in-jsx-scope': 'off', // React 17 及以上不需要引入 React
    },
}); 