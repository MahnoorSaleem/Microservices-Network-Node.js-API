import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import AppError from "../../utils/AppError";
import axios from "axios";
import { logger } from "../../logger/logger";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/ResponseHandler";

const IMAGE_MANAGER_SERVICE_URL = process.env.IMAGE_MANAGER_SERVICE_URL;

export const uploadImage = async (
  err: Error | null,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Upload Image Request Received");
  if (!err) {
    logger.error({ err }, "Failed to Upload Image");
    next(new AppError(httpStatus.NOT_FOUND, "Not found"));
  } else {
    const response = await axios.post(
      `${IMAGE_MANAGER_SERVICE_URL}v1/upload`,
      req.file
    );
		sendSuccessResponse(res, response, 'Image Uploaded successfully');

  }
};

export const modifyImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    `Modify Image Request Received for the id: ${req?.params?.id} and body is: ${req.body}`
  );
  try {
    const id = req?.params?.id;
    const response = await axios.patch(
      `${IMAGE_MANAGER_SERVICE_URL}v1/image${id}`,
      req
    );
		sendSuccessResponse(res, response, 'Image Modified successfully');
  } catch (error) {
    logger.error({ err: error }, "Failed to Update Image");
		if (error instanceof Error) {
			logger.error({err:error}, 'Failed to Upload Image');
			sendErrorResponse(res, 500, 'Failed to upload Image', error.message);
		} else {
			logger.error({err: error}, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Delete Image Request Received for the id: ${req?.params?.id}`);
  try {
    const id = req?.params?.id;
    const response = await axios.delete(
      `${IMAGE_MANAGER_SERVICE_URL}v1/image${id}`
    );
    console.log(response);
		sendSuccessResponse(res, response, 'Image Deleted Successfully');
  } catch (error) {
    logger.error({ err: error }, "Failed to delete Image");
		if (error instanceof Error) {
			logger.error({err:error}, 'Failed to Upload Image');
			sendErrorResponse(res, 500, 'Failed to upload Image', error.message);
		} else {
			logger.error({err: error}, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
  }
};
