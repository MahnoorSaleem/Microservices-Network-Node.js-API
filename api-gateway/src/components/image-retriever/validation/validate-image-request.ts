import { param } from "express-validator";

export const validateRetriveImageDataRequest = [
    param('id').isMongoId().withMessage('Invalid image ID format')
  ];
  