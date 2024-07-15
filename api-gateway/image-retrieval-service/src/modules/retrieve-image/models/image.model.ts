import mongoose, { Schema } from 'mongoose';

export interface Tag {
    id: string;
    label: string;
    color: string;
}

export interface Image {
    filename: string;
    s3_key: string;
    url: string;
    uploadedAt: Date;
    tags: Tag[];
    hash: String;
    fileSize: number;
    uploadDate: Date;
    modificationDate: Date;
    metaModificationDate: Date;
    title: string;
    description: string;
    lockFile: boolean;
    fileType: string; 
}

const TagSchema: Schema = new Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true },
  });

export const ImageSchema: Schema = new Schema({
    filename: { type: String, required: true },
    s3_key: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    tags: { type: [TagSchema], required: true },
    hash: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    modificationDate: { type: Date, required: true },
    metaModificationDate: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lockFile: { type: Boolean, required: true },
    fileType: { type: String, required: true },
});

const ImageModel = mongoose.model<Image>('Image', ImageSchema);

export default ImageModel;