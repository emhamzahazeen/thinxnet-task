import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, params, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if (originalUrl.startsWith('/health')) {
        return;
      }

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} q: ${JSON.stringify(
          params,
        )} b: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
