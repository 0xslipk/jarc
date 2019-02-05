/**
 * Module dependencies
 */
const winston = require('winston');
const { LOG_LEVEL } = require('jarc-env');

/**
 * Convert json to tags string format
 */
const json2tags = (tags = {}) => Object.keys(tags).map((key) => {
  let value = tags[key];

  if (typeof value === 'object' && value !== null) {
    value = json2tags(value);
  }

  return `[${key}:${value}]`;
}).join(' ');

/**
 * Add available method to the prototype
 */
const addAvailableMethod = (name, client, level, msg, tags) => {
  const result = tags || {};

  if (name) {
    result.name = name;
  }

  result.level = level.toUpperCase();
  client[level](msg, { tags: json2tags(result) });
};

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
      winston.format.printf(info => `${info.timestamp} - ${info.message} - ${info.tags}`),
    ),
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        humanReadableUnhandledException: true,
      }),
    ],
  });

  return this;
}

/* eslint-disable func-names */
/**
 * Log info tags string
 */
Logger.prototype.info = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'info', msg, tags);
};

/**
 * Log warn tags string
 */
Logger.prototype.warn = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'warn', msg, tags);
};

/**
 * Log error tags string
 */
Logger.prototype.error = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'error', msg, tags);
};

/**
 * Log verbose tags string
 */
Logger.prototype.verbose = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'verbose', msg, tags);
};

/**
 * Log debug tags string
 */
Logger.prototype.debug = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'debug', msg, tags);
};

/**
 * Log silly tags string
 */
Logger.prototype.silly = function (msg, tags = {}) {
  addAvailableMethod(this.name, this.client, 'silly', msg, tags);
};
/* eslint-enable func-names */

const logger = new Logger('service');

logger.info('get list', {
  a: 1,
  b: 2,
});

// /**
//  * Expose Logger
//  */
// module.exports = name => new Logger(name);
