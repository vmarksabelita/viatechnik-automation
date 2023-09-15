import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from '@middy/http-error-handler'

import schema from './schema'
import validator from '@middy/validator'
import axios, { AxiosInstance } from 'axios'

const jira: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  const { issues, webhook }: any = event.body
  const tickets = issues.split(' ')
  const payload = {
    issues: tickets,
  }

  const jiraAxiosInstance: AxiosInstance = axios.create()
  await jiraAxiosInstance.post(webhook, payload)

  return formatJSONResponse({
    message: 'Successfully moved ticket',
  })
}

export const jiraTicket = middyfy(jira)
  .use(
    validator({
      eventSchema: transpileSchema(schema),
    })
  )
  .use(httpErrorHandler())
