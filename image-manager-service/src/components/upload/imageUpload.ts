
import ImageModel from "../../models/image";

import { S3Service } from '../../services/S3Service';
import upload from '../../middlewares/multerConfig';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { createResponse, sendErrorResponse, sendResponse, sendSuccessResponse } from "../../utils/ResponseHandler";
import { findImage, saveImage } from "../../imageRepository/imageRepository";


const s3Service = new S3Service();

export const uploadImage = async (req: Request | any, res: Response): Promise<void> => {
    // upload.single('image')(req, res, async (err: any) => {
    //     if (err) {
    //         console.error('File upload error:', err);
    //         return res.status(400).json({ error: err.message });
    //     }
        try {
            const { originalname, buffer, mimetype } = req?.file;
            let fileBufferdata = buffer;
            if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
                fileBufferdata = Buffer.from(buffer.data);
            }

            const hash = crypto.createHash('md5').update(fileBufferdata).digest('hex').toString();
            const fileBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer, 'base64');

            const existingImage: any = await findImage(hash);
    
            if (existingImage) {
                res.json({
                    success: true,
                    isDuplicate: true,
                    imageUrl: existingImage.url,
                });
            }
          
            const uploadResult = await s3Service.uploadFile(originalname, fileBuffer, mimetype);
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
            console.log(ImageData, 'ImageData')
            const response = await saveImage(ImageData)
            const data = {
                isDuplicate: false,
                data: response
            }
            sendSuccessResponse(res, data, 'Image Uploaded successfully');
        } catch (error) {
            if (error instanceof Error) {
                sendErrorResponse(res, 500, 'Failed to upload Image', error.message);
              } else {
                sendErrorResponse(res, 500, 'An unknown error occurred', String(error));
              }
        }
    // });
};
