import { NextFunction, Request, Response } from 'express';
import { AuthenticationError, BadRequestError, InvalidError, InvalidTokenError, SyntaxError, TimeoutError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import logger from '@logger';

/**
 * Express Error Handler
 * ## 처리 가능 오류
 * * BadRequestError
 * * InvalidError
 * * InvalidTokenError
 * * AuthenticationError
 * * SyntaxError
 * * TimeoutError
 */

export default function ErrorHandle(error: unknown, req: Request, res: Response, next: NextFunction) {    
    if (error instanceof Error) {
        logger.error(`${req.method} ${req.originalUrl}\n${error.stack}`);        
    } else {
        logger.error(`${req.method} ${req.originalUrl} unknown error`);
    }
    switch (true) {
        case error instanceof BadRequestError:
            return res.status(400).json(createResponseMessage("error", "bad request", {}));
        case error instanceof SyntaxError:
            return res.status(400).json(createResponseMessage("error", "bad request (SyntaxError)", {}));
        case error instanceof TimeoutError:
            return res.status(500).json(createResponseMessage("error", "timeout", {}));
        case error instanceof InvalidError:
            return res.status(401).json(createResponseMessage("error", "invalid request", {}));
        case error instanceof InvalidTokenError:
            return res.status(401).json(createResponseMessage("error", "invalid token", {}));            
        case error instanceof AuthenticationError:
            return res.status(401).json(createResponseMessage("error", "timeout", {}));
        default:
            return res.status(500).json(createResponseMessage("error", "unknown error", {}));
    }
}