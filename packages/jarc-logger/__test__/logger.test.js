/* eslint-env jest */
/**
 * Module dependencies
 */
const logger = require('..');

/**
 * FormMessage component Unit Test
 */
describe('Logger', () => {
  it('should match with default values and not change', () => {
    process.env.SERVER_PORT = 8081;
    process.env.LOG_LEVEL = 'info';

    expect(env.PRODUCTION).not.toBeTruthy();
    expect(env.DEVELOPMENT).not.toBeTruthy();
    expect(env.TEST).toBeTruthy();
    expect(env.SERVER_HOST).toEqual('localhost');
    expect(env.SERVER_PORT).toEqual(8080);
    expect(env.LOG_LEVEL).toEqual('debug');
  });
});
