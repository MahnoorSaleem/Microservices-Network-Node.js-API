import { param } from "express-validator";

export const validateDeleteImageRequest = [
    param('id').isMongoId().withMessage('Invalid image ID format')
];

import { body } from "express-validator";

export const uploadValidations = [
    body('image')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('No file uploaded');
        }
        return true;
      })
      .custom((value, { req }) => {
        const { originalname, buffer, mimetype } = req.file;
        if (!originalname || !buffer || !mimetype) {
          throw new Error('Invalid file: missing required properties');
        }
        return true;
      })
      .custom((value, { req }) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
          throw new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed');
        }
        return true;
      })
      .custom((value, { req }) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
          throw new Error('File size exceeds the limit of 5MB');
        }
        return true;
      }),
  ];

export const validatePatchImageRequest = [
    // param('id').matches(/^[a-f\d]{24}$/i).withMessage('Invalid image ID format'),
    body('tags').isArray().withMessage('Tags must be an array'),
    body('tags.*').custom((tag: any) => {
      // Check if tag is a valid 24-character hexadecimal string or a string
      const isValidHexId = /^[a-f\d]{24}$/i.test(tag);
      const isString = typeof tag === 'string';
      if (!isValidHexId && !isString) {
        throw new Error('Invalid tag format');
      }
      return true;
    })
];


  