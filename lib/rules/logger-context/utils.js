const isParamContextExists = (properties) => {
  const contextParam = properties.find(property => (
    property.type === 'Property'
    && property.key.type === 'Identifier'
    && property.key.name === 'context'
    && (property.shorthand === true || property.value.type === 'ObjectExpression')
  ));

  return !!contextParam;
};

module.exports = {
  isParamContextExists,
};
