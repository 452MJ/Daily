/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  // Allows you to enable support for JSX files, and `.mjs` files which
  // is the new node standard
  // https://github.com/facebook/react-native/pull/5233
  // Note: One caveat, The `index.js` file in the root of your project has to be `.js`.
  resolver: {
    sourceExts: [
      'js', // note this has to be defined first or you get an error
      'json',
      'jsx',
      'mjs',
      // required because the react-native cli ignores `resolverMainFields`
      'ts',
      'tsx',
    ],
  },
  // this prevents the `react-native` field from being used so `ts` and `tsx`
  // files don't have to be transpiled
  resolverMainFields: ['main'],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
