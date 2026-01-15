import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  constructor(
    public readonly errorCode: string,
    public readonly message: string,
    status: HttpStatus,
    public readonly details?: any,
  ) {
    super({ message, errorCode, details }, status);
  }
}