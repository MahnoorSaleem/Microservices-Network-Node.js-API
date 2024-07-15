import { Response } from 'express';

interface ResponseData<T = any> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
  }
  
  export function createResponse<T = any>(
    statusCode: number, 
    message: string, 
    data?: T, 
    error?: string
  ): ResponseData<T> {
    return {
      statusCode,
      message,
      ...(data !== undefined && { data }),
      ...(error !== undefined && { error })
    };
  }
  
  export function sendResponse<T = any>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    error?: string
  ): void {
    const response = createResponse(statusCode, message, data, error);
    res.status(response.statusCode).json(response);
  }

export function sendErrorResponse(res: Response, statusCode: number = 500, message: string = 'Internal Server Error', error?: string): void {
  sendResponse(res, statusCode, message, undefined, error);
}