import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import AppError from '../../utils/AppError';

export const uploadImage = (err: Error | null, req: Request, res: Response, next: NextFunction): void => {
    if (!err) {
        next(new AppError(httpStatus.NOT_FOUND, "Not found"));
    } else {
        next(); // You may want to handle the error here if needed
    }
};