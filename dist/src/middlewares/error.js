import { statusCodeFromErrors, testError } from "../utils/errorUtils.js";
export default function handleErrorsMiddleware(err, req, res, next) {
    console.log(err);
    if (testError(err)) {
        var statusCode = statusCodeFromErrors(err.type);
        return res.status(statusCode).send(err.message);
    }
    res.sendStatus(500);
}
