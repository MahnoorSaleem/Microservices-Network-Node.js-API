import mongoose, { Schema } from 'mongoose';

export interface Image {
    filename: string;
    s3_key: string;
    url: string;
    uploadedAt: Date;
    tags: string[];
    hash: String;
   
}

export const ImageSchema: Schema = new Schema({
    filename: { type: String, required: true },
    s3_key: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    tags: { type: Array, required: true },
    hash: { type: String, required: true },


});

const ImageModel = mongoose.model<Image>('Image', ImageSchema);

export default ImageModel;
