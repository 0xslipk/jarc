/* eslint-env jest */
/**
 * Module dependencies
 */
const logger = require('../')('test-service');
const { json2tags } = require('../helpers');

/**
 * FormMessage component Unit Test
 */
describe('Logger', () => {
  const utcDate = new Date(new Date().toUTCString());
  const data = {
    foo: 'Test Logger with Jest!',
    body: {
      phome: '11111111',
      text: 'message incoming',
    },
  };
  const tags = json2tags(data);

  it('should match with info message result', () => {
    const message = 'testing info message';
    let result = '';

    logger.client = {
      info: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.info(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:INFO]`);
  });

  it('should match with warn message result', () => {
    const message = 'testing warn message';
    let result = '';

    logger.client = {
      warn: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.warn(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:WARN]`);
  });

  it('should match with error message result', () => {
    const message = 'testing error message';
    let result = '';

    logger.client = {
      error: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.error(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:ERROR]`);
  });

  it('should match with verbose message result', () => {
    const message = 'testing verbose message';
    let result = '';

    logger.client = {
      verbose: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.verbose(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:VERBOSE]`);
  });

  it('should match with debug message result', () => {
    const message = 'testing debug message';
    let result = '';

    logger.client = {
      debug: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.debug(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:DEBUG]`);
  });

  it('should match with silly message result', () => {
    const message = 'testing silly message';
    let result = '';

    logger.client = {
      silly: (msg, payload) => {
        result = `${utcDate} - ${msg} - ${payload.tags}`;
      },
    };

    logger.silly(message, data);

    expect(result).toBe(`${utcDate} - ${message} - ${tags} [log_name:${logger.name}] [log_level:SILLY]`);
  });
});
