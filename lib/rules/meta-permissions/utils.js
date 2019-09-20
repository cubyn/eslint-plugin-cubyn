const arePermissionsExistsObjectVariant = (properties) => {
  const permissionsKey = properties.find(property => (
    property.type === 'Property'
    && property.key.type === 'Identifier'
    && property.key.name === 'permissions'
    && (property.shorthand === true
      || (property.value.type === 'ArrayExpression' && property.value.elements.length))
  ));

  return !!permissionsKey;
};

const arePermissionsExistsAssignmentVariant = node => (
  node.type === 'ArrayExpression' || node.type === 'Identifier'
);

module.exports = {
  arePermissionsExistsObjectVariant,
  arePermissionsExistsAssignmentVariant,
};
