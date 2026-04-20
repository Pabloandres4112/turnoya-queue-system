module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm/)?' +
      '(' +
      '@react-native(-community)?|' +
      'react-native|' +
      '@react-navigation|' +
      'react-native-screens|' +
      'react-native-gesture-handler|' +
      'react-native-safe-area-context' +
      ')' +
      ')',
  ],
};
