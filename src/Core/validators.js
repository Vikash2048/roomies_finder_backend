import Joi from "joi";
export const landlord_address_validator=async(req)=>{
    const schema=Joi.object({
        address:Joi.string().required().messages({
            'string.base':'address should of string type',
            'string.empty':"address can't be empty",
            'any.required':'address is required field',
        }),
        images:Joi.string().required().messages({
            'string.base':'images should of string type',
            'string.empty':"images can't be empty",
            'any.required':'images is required field',
        }),
        mobile:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can't be empty",
            'any.required':'mobile is required field',
        }),
        email:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        })
    })
   
    return schema.validate(req.body);
}

export const user_validator=async(req)=>{
    const schema=Joi.object({
        userName:Joi.string().required().messages({
            'string.base':'address should of string type',
            'string.empty':"address can't be empty",
            'any.required':'address is required field',
        }),
        fullName:Joi.string().required().messages({
            'string.base':'images should of string type',
            'string.empty':"images can't be empty",
            'any.required':'images is required field',
        }),
        email:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can't be empty",
            'any.required':'mobile is required field',
        }),
        mobile:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        }),
        avatar:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        }),
        password:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        }),
        userType:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        })
    })
   
    return schema.validate(req.body);
}

export const roommate_validator=async(req)=>{
    const schema=Joi.object({
        ownerName:Joi.string().required().messages({
            'string.base':'address should of string type',
            'string.empty':"address can't be empty",
            'any.required':'address is required field',
        }),
        ownerMobile:Joi.string().required().messages({
            'string.base':'images should of string type',
            'string.empty':"images can't be empty",
            'any.required':'images is required field',
        }),
        address:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can't be empty",
            'any.required':'mobile is required field',
        }),
        image:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can't be empty",
            'any.required':'email is required field',
        })
    })
    return schema.validate(req.body);
}