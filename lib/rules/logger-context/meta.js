module.exports = {
  docs: {
    description: 'Enforce passing Carotte context parameter to logger functions',
    category: 'Carotte issues',
    recommended: true,
  },
  fixable: null,
  schema: [],
  messages: {
    missing: 'Context parameter required but not found.',
  },
};
