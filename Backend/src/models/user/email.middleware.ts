import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class EmailMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Check if user email is verified
    try {
      ;(await getAuth().getUser('CPT6hVvLVtgOc7VZBC33XToqPZn1')).emailVerified
        ? next()
        : next(
            new HttpException(
              { message: 'Verify your email.', verified: false },
              HttpStatus.BAD_REQUEST,
            ),
          )
    } catch (error) {
      throw new HttpException(
        'Oops something went wrong',
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
