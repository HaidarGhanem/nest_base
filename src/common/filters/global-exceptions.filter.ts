import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ERR_CODES } from '../constants/error-codes';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionManager');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ERR_CODES.SYSTEM.INTERNAL;
    let message = 'Internal Server Error';
    let details = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      errorCode = res.errorCode || ERR_CODES.SYSTEM.VALIDATION;
      message = res.message || exception.message;
      details = res.details || null;
    } else {
      this.logger.error(`Critical Error: ${exception.message}`, exception.stack);
    }

    const errorBody = {
      success: false,
      statusCode: status,
      errorCode,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorBody);
  }
}