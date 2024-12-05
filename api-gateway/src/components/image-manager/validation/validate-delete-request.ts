import { param } from "express-validator";

export const validateDeleteImageRequest = [
    param('id').isMongoId().withMessage('Invalid image ID format')
  ];
  