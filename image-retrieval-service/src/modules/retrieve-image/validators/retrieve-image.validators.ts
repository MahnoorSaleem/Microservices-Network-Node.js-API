import { param } from "express-validator";

// export const validateImageRequest = () => {
//     console.log('test part middleware')
//     param('id').isMongoId().withMessage('Invalid image ID format')
// }


export const validateImageRequest = () => [
    param('id').isMongoId().withMessage('Invalid image ID format')
];


