/**
 * Environment variables
 */
const variables = process.env;

// if NODE_ENV is not define set development
variables.NODE_ENV = variables.NODE_ENV || 'development';

/**
 * env (we take the process.env variables and we add some custom shortcuts)
 */
const env = Object.assign({}, variables, {
  PRODUCTION: variables.NODE_ENV === 'production',
  DEVELOPMENT: variables.NODE_ENV === 'development',
  TEST: variables.NODE_ENV === 'test',
  SERVER_HOST: variables.SERVER_HOST || 'localhost',
  SERVER_PORT: variables.PORT || 8080,
  LOG_LEVEL: variables.LOG_LEVEL || 'debug',
});

/**
 * Expose env
 */
module.exports = env;
