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

module.exports = {
  json2tags,
};
