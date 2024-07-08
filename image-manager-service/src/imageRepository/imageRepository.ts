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
    return result;
}