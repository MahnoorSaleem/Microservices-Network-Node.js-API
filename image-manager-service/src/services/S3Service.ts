// src/services/s3Service.ts

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    signatureVersion: 'v4',
});
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

class S3Service {
    async uploadFile(fileName: string, fileBuffer: Buffer, contentType: string): Promise<AWS.S3.ManagedUpload.SendData> {
        try {
            const params: AWS.S3.PutObjectRequest = {
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: fileName,
                Body: fileBuffer,
                ContentType: contentType,
            };

            const data = await s3.upload(params).promise();
            return data;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error;
        }
    }
}

export { S3Service };
