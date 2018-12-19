/**
 * Expose Jest config
 */
module.exports = {
  verbose: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.{js}',
    '!**/node_modules/**',
  ],
  moduleDirectories: [
    'node_modules',
    'packages',
  ],
};
