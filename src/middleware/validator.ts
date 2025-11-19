import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';

const validateSchema = (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ type: error.name, message: error.message, errors: error.errors });
      return;
    }
    next(error);
  }
};

export default validateSchema;
