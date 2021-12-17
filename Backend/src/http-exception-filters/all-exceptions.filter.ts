import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status: number

    try {
      status = exception.getStatus()
    } catch {
      status = 500
    }

    Logger.log(
      `
      {
        statusCode: ${status}
        path: ${request.url}
        message: ${exception.message}
      }
      `,
      'Http Exception Error',
    )

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        status >= 400 && status < 500
          ? exception.message
          : 'Oops something went wrong',
    })
  }
}
