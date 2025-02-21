import Joi from "joi";
export var publishSchemaInput = Joi.object({
    coment: Joi.string().required(),
    urlImage: Joi.string().uri(),
    rateNote: Joi.string().required(),
    localizationName: Joi.string().required(),
    localizationLat: Joi.required(),
    localizationLong: Joi.required(),
    userId: Joi.number().required(),
    optionId: Joi.number().required()
});
