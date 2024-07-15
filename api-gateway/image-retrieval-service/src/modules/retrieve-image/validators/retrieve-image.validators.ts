import { param } from "express-validator";

export const validateImageRequest = () => {
    param('id').isMongoId().withMessage('Invalid image ID format')
}



