const { param, body } = require('express-validator');

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

