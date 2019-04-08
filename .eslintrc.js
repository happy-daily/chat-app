module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "globals": {
    "__DEV__": true,
    "alert": true,
  },
  "env": {
    "jest": true,
  },
  "rules": {
    "no-case-declarations": 1,
    "no-await-in-loop": 1,
    "no-console": 0,
    "quotes": 0,
    "quote-props": 0,
    "no-alert": 0,
    "class-methods-use-this": 0,
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "react/prop-types": [2, { ignore: ["navigation"], customValidators: [] }],
    "react/forbid-prop-types": [2, { "forbid": ["any"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-multi-comp":1,
    "max-len": 1,
    "arrow-body-style": 0,
    "no-plusplus": 0,
    "react/sort-comp": 0,
    "no-lonely-if": 0,
    "spaced-comment": 1,
    "react/jsx-indent": 1,
    "no-param-reassign": 1,
    "parserOptions": {
      "ecmaFeatures": {
        "legacyDecorators": true
      }
    }
  }
};
