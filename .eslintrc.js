module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [
      "plugin:react/recommended",
      "airbnb",
      "plugin:import/typescript"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "@typescript-eslint",
  ],
  "rules": {
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
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
 }
}
