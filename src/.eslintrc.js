module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  plugins: [
    'module-resolver',
    {
      root: '.',
      alias: {
        '_apis/*': './apis/*',
        '_actions/*': './actions/*',
        '_hocs/*': './hocs/*',
        '_helpers/*': './helpers/*',
        '_assets/*': './assets/*',
        '_components/*': './screens/components/*',
        _types: './types/index.ts',
        _navigation: './navigate.ts',
        _typography: './theme/typography.js',
        _palette: './theme/palette',
        _metrics: './theme/metrics',
        _globals: './theme/globals',
        _zIndex: './theme/zIndex',
        _rootReducer: './reducers/index.ts',
      },
    },
  ],
};
