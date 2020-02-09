module.exports = {
  extends: ["airbnb", "prettier", "react-native-community"],
  parser: "babel-eslint",
  root: true,
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        paths: [""],
        alias: {
          _assets: "./assets",
          _helpers: "./helpers",
          _components: "./screens/components",
          _typography: "./theme/typography.js",
          _palette: "./theme/palette.js",
          _metrics: "./theme/metrics.js",
          _globals: "./theme/globals.js",
          _zIndex: "./theme/zIndex.js"
        }
      }
    }
  },
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "no-unused-vars": ["error"],
    "react-destructing-assignment": [0],
    "max-len": [0],
    "react/state-in-constructor": [0],
    "react/no-array-index-key": [1],
    "no-useless-escape": [0],
    "no-control-regex": [0],
    "import/prefer-default-export": [0],
    "react/jsx-props-no-spreading": [0],
    "react/destructuring-assignment": [0],
    "no-underscore-dangle": [0],
    "react/no-access-state-in-setstate": [1],
    "no-await-in-loop": [1],
    "no-plusplus": [1],
    "import/no-named-default": [0],
    "global-require": [0],
    "class-methods-use-this": [0],
    "consistent-return": [0]
  },
  globals: {
    fetch: false
  }
};
