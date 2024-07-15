import { Request, Response } from "express";
import { logger } from "../../../logger/logger";
import { sendErrorResponse } from "../../../middlewares/error-handler.middleware";
import { findById, findImage } from "../repo/retrieve-image.repo";
import { sendSuccessResponse } from "../../../middlewares/response-handler.middleware";
import {getImageList, listImagesQuery} from "../repo/queries/image.query";

interface ListImagesOptions {
  includeDuplicates?: boolean;
  onlyTagged?: { all: boolean; tagIds: string[] };
  pager?: { offset: number; size: number };
  sortBy?: 'modificationDate' | 'metaModificationDate' | 'title' | 'fileSize';
}

// export const getImageById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const data = await findImage(id);
// 				sendSuccessResponse(res, {data}, 'Image Rerieved successfully');
//       } catch (error) {
//         if (error instanceof Error) {
// 			logger.error({ err: error }, 'Failed to get the Image');
// 			sendErrorResponse(res, 500, 'Failed to get the Image', error.message);
// 		} else {
// 			logger.error({ err: error }, 'An unkown error occured');
// 			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
// 		}
//       }
// }

// export const getImageMeta = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const data = await findImage(id);
// 		sendSuccessResponse(res, {data}, 'Image Meta Retrieved successfully');
//     } catch (error) {
//       if (error instanceof Error) {
// 				logger.error({ err: error }, 'Failed to get the metadata');
// 				sendErrorResponse(res, 500, 'Failed to get the metadata', error.message);
// 		} else {
// 				logger.error({ err: error }, 'An unkown error occured');
// 				sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
// 		}
//     }
// }

export const getImages = async (req: Request, res: Response) => {
  try {
    const options = {
      includeDuplicates: req.query.includeDuplicates === 'true',
      onlyTagged: {
        all: req.query.all === 'true',
        tagIds: (req.query.tagIds as string)?.split(',') || [],
      },
      pager: {
        offset: parseInt(req.query.offset as string, 10) || 0,
        size: parseInt(req.query.size as string, 10) || 10,
      },
      sortBy: req.query.sortBy as 'modificationDate' | 'metaModificationDate' | 'title' | 'fileSize',
    };

    const images = await listImagesQuery(options);
		sendSuccessResponse(res, {data: images}, 'Image Meta Retrieved successfully');
  } catch (error) {
		if (error instanceof Error) {
			logger.error({ err: error }, 'Failed to get the metadata');
			sendErrorResponse(res, 500, 'Failed to get the metadata', error.message);
	} else {
			logger.error({ err: error }, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
	}
  }
};

// export const fetchImages = async (req: Request, res: Response) => {
//   try {
//     const options = {
//       includeDuplicates: req.query.includeDuplicates === 'true',
//       onlyTagged: {
//         all: req.query.all === 'true',
//         tagIds: (req.query.tagIds as string)?.split(',') || [],
//       },
//       pager: {
//         offset: parseInt(req.query.offset as string, 10) || 0,
//         size: parseInt(req.query.size as string, 10) || 10,
//       },
//       sortBy: req.query.sortBy as ListImagesOptions['sortBy'], // Adjusted type assertion
//     };

//     const images = await getImageList(options);
//     res.json(images);
//   } catch (error) {
//     if (error instanceof Error) {
// 			logger.error({ err: error }, 'Failed to get the metadata');
// 			sendErrorResponse(res, 500, 'Failed to get the metadata', error.message);
// 	} else {
// 			logger.error({ err: error }, 'An unkown error occured');
// 			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
// 	}
//   }
// };


export const getMetadata = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Fetch metadata for the image with the specified ID
    const metadata = await findById(id);

    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found' });
    }

    // Construct the metadata response
    const metadataResponse = {
      title: metadata.title,
      description: metadata.description,
      lockFile: metadata.lockFile,
      uploadDate: metadata.uploadDate,
      modificationDateFile: metadata.modificationDate,
      modificationDateMeta: metadata.metaModificationDate,
      fileSize: metadata.fileSize,
      fileType: metadata.fileType,
      fileURL: metadata.url,
      tags: metadata.tags.map(tag => ({ id: tag.id, label: tag.label, color: tag.color })),
      id: metadata._id,
    };

    res.json(metadataResponse);
  } catch (error) {
		if (error instanceof Error) {
			logger.error({ err: error }, 'Failed to get the metadata');
			sendErrorResponse(res, 500, 'Failed to get the metadata', error.message);
	} else {
			logger.error({ err: error }, 'An unkown error occured');
			sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
	}
  }
};