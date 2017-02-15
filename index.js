'use strict';

module.exports = {
  rules: {
    'no-logger-log': require('./lib/rules/no-logger-log'),
    'import/no-extraneous-dependencies': [
        "error",
        { "devDependencies": [ "**/*.spec.js" ] }
    ]
  }
};
