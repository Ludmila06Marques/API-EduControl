import * as userSchema from "../schemas/userSchema.js";
import * as optionSchema from "../schemas/optionSchema.js";
import * as publishSchema from "../schemas/publishSchema.js";
import { failSchema } from "../utils/errorUtils.js";
export function validateSignup(req, res, next) {
    var user = req.body;
    console.log(req.body);
    var validation = userSchema.userSchemaSignup.validate(user);
    if (validation.error) {
        throw failSchema('Wrong schema');
    }
    next();
}
export function validateLogin(req, res, next) {
    var user = req.body;
    console.log(req.body);
    var validation = userSchema.userSchemaLogin.validate(user);
    if (validation.error) {
        throw failSchema('Wrong schema');
    }
    next();
}
export function validateOption(req, res, next) {
    var option = req.body;
    console.log(req.body);
    var validation = optionSchema.optionSchemaInput.validate(option);
    if (validation.error) {
        throw failSchema('Wrong schema');
    }
    next();
}
export function validatePublish(req, res, next) {
    var publish = req.body;
    console.log(req.body);
    var validation = publishSchema.publishSchemaInput.validate(publish);
    if (validation.error) {
        console.log(validation.error);
        throw failSchema('Wrong schema');
    }
    next();
}
