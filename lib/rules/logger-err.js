module.exports = {
  meta: {
    docs: {
      description: 'Enforce passing Carotte err parameter to logger functions',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Err parameter required but not found.',
    },
  },
  create: (context) => {
    const LOGGER_FUNCTIONS = ['error', 'info', 'log', 'warn'];

    const isParamContextExists = (properties) => {
      const contextParam = properties.find(property => (
        property.type === 'Property'
        && property.key.type === 'Identifier'
        && property.key.name === 'err'
        && property.value.value !== null
      ));

      return !!contextParam;
    };

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
