export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        issues: { type: 'string' },
        webhook: { type: 'string' },
      },
      required: ['issues', 'webhook'],
    },
  },
} as const
