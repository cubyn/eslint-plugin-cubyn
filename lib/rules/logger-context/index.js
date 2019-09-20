const meta = require('./meta');
const { LOGGER_FUNCTIONS } = require('./constants');
const { isParamContextExists } = require('./utils');

module.exports = {
  meta,
  create: (context) => {
    const linterRule = (node) => {
      const [, params] = node.arguments;

      if (!isParamContextExists(params.properties)) {
        context.report({
          node,
          loc: params.loc.start,
          messageId: 'missing',
        });
      }
    };

    return LOGGER_FUNCTIONS.reduce((acc, level) => {
      const astSelector = `CallExpression[callee.object.name="logger"][callee.property.name="${level}"]`;
      acc[astSelector] = linterRule;

      return acc;
    }, {});
  },
};
