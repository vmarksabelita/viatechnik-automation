import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.jiraTicket`,
  events: [
    {
      http: {
        method: 'post',
        path: '/automation/jira/ticket',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
