
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};


// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

//check validation  
const checkValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        protocol: Joi.string().valid("http", "https", "tcp").required(),
        path: Joi.string().optional(),
        port: Joi.string().optional(),
        webhook: Joi.string().optional(),
        timeout: Joi.number().min(1000).integer().optional(),
        interval: Joi.number().min(50000).integer().optional(),
        threshold: Joi.number().default(1).integer().optional(),
        authentication: Joi.object({
            username: Joi.string().min(2).max(15),
            password: Joi.string().min(6).max(255),
        }).optional(),
        httpHeaders: Joi.object().optional(),
        assert: Joi.object({
            statusCode: Joi.number().default(200)
        }).optional(),
        tags: Joi.array().optional(),
        ignoreSSL: Joi.boolean().required(),
        paused: Joi.boolean().default(false),
        userId: Joi.string().required()

    })
    return schema.validate(data);
}


module.exports = { registerValidation, loginValidation, checkValidation }