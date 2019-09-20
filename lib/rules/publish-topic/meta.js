module.exports = {
  docs: {
    description: 'Enforce to publish with qualifier starting with topic/',
    category: 'Carotte issues',
    recommended: true,
  },
  fixable: 'code',
  schema: [],
  messages: {
    missing: 'Qualifier starting with topic/ required but not found.',
  },
};
