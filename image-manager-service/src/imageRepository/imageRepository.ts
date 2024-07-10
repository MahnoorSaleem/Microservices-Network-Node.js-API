import { logger } from "../logger/logger";
import ImageModel from "../models/image";

export const saveImage = async(imageData: any) => {
    const image = new ImageModel(imageData);
    const result = await image.save();
    // update result here
    console.log(result, 'result')
    return result;
}

export const findImage = async(hash: string) => {
    const result = await ImageModel.findOne({ hash })
    // Manipulate result here before sending
    logger.info('find one image result', result)
    return result;
}

export const findAndDelete = async(imageId: string) => {
    const result = await ImageModel.findByIdAndDelete({ _id: imageId })
    // Manipulate result here before sending
    return result;
}


export const findAndUpdate = async(imageId: string, tags: any) => {
    const result = await ImageModel.findByIdAndUpdate({_id: imageId},
        { tags },
        { new: true })
    // Manipulate result here before sending
    console.log('resulttttttt', result);
    return result;
}