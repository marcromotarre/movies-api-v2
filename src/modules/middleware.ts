import { validationResult } from "express-validator";
import { nextTick } from "process";

export const handleInputErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    } else {
        next()
    }
}

