
import ImageModel from "../../models/image";

import { S3Service } from '../../services/S3Service';
import upload from '../../middlewares/multerConfig';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { createResponse, sendErrorResponse, sendResponse, sendSuccessResponse } from "../../utils/ResponseHandler";
import { findImage, saveImage } from "../../imageRepository/imageRepository";
import { logger } from "../../logger/logger";


const s3Service = new S3Service();

export const uploadImage = async (req: Request | any, res: Response): Promise<void> => {
        try {
            logger.info("Image Upload Request Received");
            const { originalname, buffer, mimetype } = req?.file;
            let fileBufferdata = buffer;
            if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
                fileBufferdata = Buffer.from(buffer.data);
            }

            const hash = crypto.createHash('md5').update(fileBufferdata).digest('hex').toString();
            logger.info({hash}, 'Image hash generated successfully');

            const fileBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer, 'base64');

            const existingImage: any = await findImage(hash);
            logger.info({hash, imageUrl: existingImage.url}, 'Duplication Image Found');
    
            if (existingImage) {
                res.json({
                    success: true,
                    isDuplicate: true,
                    imageUrl: existingImage.url,
                });
            }
          
            const uploadResult = await s3Service.uploadFile(originalname, fileBuffer, mimetype);
            logger.info({originalname, s3Key:uploadResult.Key}, 'Image uploaded to s3 successfully');

            const cleanValue = uploadResult.ETag.replace(/^\"|\"$/g, '');

            const ImageData = {
                filename: originalname,
                s3_key: uploadResult?.Key,
                tag: uploadResult?.ETag,
                uploadedAt: new Date(),
                url: uploadResult?.Location || '',
                tags: [cleanValue],
                hash
            }
            
            logger.info({ImageData}, 'Saving Image data to the database');

            const response = await saveImage(ImageData)
            const data = {
                isDuplicate: false,
                data: response
            }

            logger.info('Image data saved successfully');
            sendSuccessResponse(res, data, 'Image Uploaded successfully');
        } catch (error) {
            if (error instanceof Error) {
                logger.error({err:error}, 'Failed to Upload Image');
                sendErrorResponse(res, 500, 'Failed to upload Image', error.message);
              } else {
                logger.error({err: error}, 'An unkown error occured');
                sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
              }
        }
    // });
};
