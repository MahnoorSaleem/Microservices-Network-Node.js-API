// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError';

export const errorHandler = (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
