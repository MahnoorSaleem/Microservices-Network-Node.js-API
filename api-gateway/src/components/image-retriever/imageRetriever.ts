import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { logger } from "../../logger/logger";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/ResponseHandler";

const IMAGE_RETRIEVE_SERVICE_URL = process.env.IMAGE_RETRIEVE_SERVICE_URL;

export const getImageMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Get Image Metadata By Id Request Received for the id: ${req?.params?.id}`);
  try {
    const id = req?.params?.id;
    const response = await axios.get(
      `${IMAGE_RETRIEVE_SERVICE_URL}/image/meta/${id}`
    );
		sendSuccessResponse(res, response, 'Image Meta Retrieved Successfully');
  } catch (error) {
    logger.error({ err: error }, "Failed to Retrieve Image Meta");
		if (error instanceof Error) {
			logger.error({err:error}, 'Failed to Retrieve Image Meta');
			sendErrorResponse(res, 500, 'Failed to Retrieve Image Meta', error.message);
		} else {
			logger.error({err: error}, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
  }
};

export const getImageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Get Image By Id Request Received for the id: ${req?.params?.id}`);
  try {
    const id = req?.params?.id;
    const response = await axios.get(
      `${IMAGE_RETRIEVE_SERVICE_URL}/image${id}`
    );
		sendSuccessResponse(res, response, 'Image Retrieved Successfully');
  } catch (error) {
    logger.error({ err: error }, "Failed to Retrieve Image");
		if (error instanceof Error) {
			logger.error({err:error}, 'Failed to Retrieve Image');
			sendErrorResponse(res, 500, 'Failed to Retrieve Image', error.message);
		} else {
			logger.error({err: error}, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
  }
};