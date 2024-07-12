import { body } from "express-validator";

export const imageUploadValidation = [
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