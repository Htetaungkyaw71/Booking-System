import { ZodError, z } from "zod";
export const validateBody = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.issues,
            });
        }
        next(err);
    }
};
export const validateParams = (schema) => (req, res, next) => {
    try {
        req.params = schema.parse(req.params);
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: "Invalid parameters",
                errors: err.issues,
            });
        }
        next(err);
    }
};
//# sourceMappingURL=validate.js.map