import { findAndUpdate } from "../../imageRepository/imageRepository";
import { logger } from "../../logger/logger";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/ResponseHandler";

export const UpdateImage = async (req: any, res: any) => {
    const imageId: string = req.params.id;

    logger.info('Update Imaage Request Received for: ', imageId)
    const { tags }: { tags: string[] } = req.body;
  
    try {
      const updatedImage: any = await findAndUpdate(
        imageId,
        tags
      );
    console.log('updatedImage', updatedImage);

  
      if (!updatedImage) {
        // res.status(402).json({ error: 'Image not found' });
		sendErrorResponse(res, 402, 'Image not found'); // what should be the error code here
      }
	  sendSuccessResponse(res, updatedImage, 'Image Deleted successfully');

    //   res.status(200).json(updatedImage);
    } catch (error) {
        if (error instanceof Error) {
			logger.error({ err: error }, 'Failed to update Image');
			sendErrorResponse(res, 500, 'Failed to update Image', error.message);
		} else {
			logger.error({ err: error }, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
		}
    }
};