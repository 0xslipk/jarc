/**
 * Module dependencies
 */
const winston = require('winston');
const { LOG_LEVEL } = require('jarc-env');
const { json2tags } = require('./helpers');

/**
 * Logger constructor
 */
function Logger(name) {
  this.name = name;
  this.client = winston.createLogger({
    level: LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(/* istanbul ignore next */info => `${info.timestamp} - ${info.message} - ${info.tags}`),
    ),
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        humanReadableUnhandledException: true,
      }),
    ],
  });

  /**
   * Add available method to the prototype
   */
  this.addAvailableMethod = (level, msg, tags) => {
    const result = tags || {};

    result.log_name = this.name;
    result.log_level = level.toUpperCase();

    this.client[level](msg, { tags: json2tags(result) });
  };

  return this;
}

/* eslint-disable func-names */
/**
 * Log info tags string
 */
Logger.prototype.info = function (msg, tags = {}) {
  this.addAvailableMethod('info', msg, tags);
};

/**
 * Log warn tags string
 */
Logger.prototype.warn = function (msg, tags = {}) {
  this.addAvailableMethod('warn', msg, tags);
};

/**
 * Log error tags string
 */
Logger.prototype.error = function (msg, tags = {}) {
  this.addAvailableMethod('error', msg, tags);
};

/**
 * Log verbose tags string
 */
Logger.prototype.verbose = function (msg, tags = {}) {
  this.addAvailableMethod('verbose', msg, tags);
};

/**
 * Log debug tags string
 */
Logger.prototype.debug = function (msg, tags = {}) {
  this.addAvailableMethod('debug', msg, tags);
};

/**
 * Log silly tags string
 */
Logger.prototype.silly = function (msg, tags = {}) {
  this.addAvailableMethod('silly', msg, tags);
};
/* eslint-enable func-names */

/**
 * Expose Logger
 */
module.exports = name => new Logger(name);
