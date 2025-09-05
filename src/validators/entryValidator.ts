import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const entryShape = z.object({
  school_id: z.union([z.string(), z.number()]),
  criterion: z.string(),
  links: z.array(z.string()).optional(),
  files: z.array(z.string()).optional(),
  description: z.string().optional()
});

function handleValidation(shape: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Merge body + params so Zod sees both
      const data = {
        ...req.body,
        ...req.params,
      };

      const parsed = shape.parse(data);
      req.body = parsed; // overwrite so routes always see validated data
      console.log("parsed", parsed)
      next();
    } catch (err: any) {
      return res.status(400).json({
        error: 'validation failed',
        details: err.errors || err.message,
      });
    }
  };
}

export const entryValidator = handleValidation(entryShape);
