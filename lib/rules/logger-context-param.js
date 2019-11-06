module.exports = {
  meta: {
    docs: {
      description: 'Enforce passing Carotte "context" object parameter to logger functions',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Parameter "context" required but not found.',
    },
  },
  create: (context) => {
    const LOGGER_LEVELS_FUNCTIONS = ['error', 'info', 'log', 'warn'];

    const isParamContextExists = (properties) => {
      const contextParam = properties.find((property) => (
        property.type === 'Property'
        && property.key.type === 'Identifier'
        && property.key.name === 'context'
        && (property.shorthand === true || property.value.type === 'ObjectExpression')
      ));

      return !!contextParam;
    };

    const linterRule = (node) => {
      const [, params] = node.arguments;

      if (!params || !isParamContextExists(params.properties)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return LOGGER_LEVELS_FUNCTIONS.reduce((acc, level) => {
      const astSelector = `CallExpression[callee.object.name="logger"][callee.property.name="${level}"]`;
      acc[astSelector] = linterRule;

      return acc;
    }, {});
  },
};
