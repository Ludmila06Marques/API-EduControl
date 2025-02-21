import Joi from "joi";
export var optionSchemaInput = Joi.object({
    name: Joi.string().required(),
    urlImage: Joi.string().required()
});
