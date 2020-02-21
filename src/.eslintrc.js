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
        _navigation: './navigationService.js',
        _typography: './theme/typography.js',
        _palette: './theme/palette',
        // _metrics: './theme/metrics',
        _globals: './theme/globals',
        _zIndex: './theme/zIndex',
        _UserInterface: './interfaces/user.tsx',
      },
    },
  ],
};
