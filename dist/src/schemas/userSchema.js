import Joi from "joi";
export var userSchemaSignup = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    country: Joi.string().required(),
    urlImage: Joi.string()
        .uri()
});
export var userSchemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
