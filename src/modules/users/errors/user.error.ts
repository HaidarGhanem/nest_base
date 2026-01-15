// src/modules/users/users.exceptions.ts
import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/common/errors/base.error';
import { ERR_CODES } from 'src/common/constants/error-codes';

export class UserNotFoundException extends BaseException {
  constructor(userId: string) {
    super(
      ERR_CODES.USER.NOT_FOUND,
      `User with id: ${userId} not found!`,
      HttpStatus.NOT_FOUND,
    );
  }
}