import { findAndDelete } from "../../imageRepository/imageRepository";
import { logger } from "../../logger/logger";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/ResponseHandler";

export const deleteImage = async (req: any, res: any) => {
	logger.info("Image delete Request Received");

	const imageId: string = req.params.id;

	try {
		const deletedImage = await findAndDelete(imageId);
		logger.info('Image from Db:', deletedImage);
		if (!deletedImage) {
			sendErrorResponse(res, 402, 'Image not found'); // what should be the error code here
			return;
		}
		sendSuccessResponse(res, deletedImage, 'Image Deleted successfully');
		res.status(200).json({ message: "Image Deleted Successfully" });
	} catch (error) {
		if (error instanceof Error) {
			logger.error({ err: error }, 'Failed to delete Image');
			sendErrorResponse(res, 500, 'Failed to delete Image', error.message);
		} else {
			logger.error({ err: error }, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
	}
}