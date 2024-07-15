import { logger } from "../../../logger/logger";
import ImageModel from "../models/image.model";

export const findImage = async(id: string) => {
    const result = await ImageModel.findOne({ id })
    // Manipulate result here before sending
    logger.info('find one image result', result)
    return result;
}

export const findById = async(id: string) => {
    const result = await ImageModel.findById(id)
    // Manipulate result here before sending
    logger.info('find one image result', result)
    return result;
}




export const ImageMeta = async () => {
    try {

    } catch (error) {
        
    }
}