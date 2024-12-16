import Joi from "joi";
export const landlord_address_validator=async(req)=>{
    const schema=Joi.object({
        address:Joi.string().required().messages({
            'string.base':'address should of string type',
            'string.empty':"address can not be empty",
            'any.required':'address is required field',
        }),
        mobile:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
        price:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
        roomType:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
        roomFor:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
        bhk:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
    })
   
    return schema.validate(req.body);
}

export const user_validator=async(req)=>{
    const schema=Joi.object({
        fullName:Joi.string().required().messages({
            'string.empty':"FullName can not be empty",
            'string.base':'FullName should of string type',
            'any.required':'FullName is required field',
        }),
        email:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can not be empty",
            'any.required':'email is required field',
        }),
        mobile:Joi.string().required().messages({
            'string.base':'contact number should of string type',
            'string.empty':"contact number can not be empty",
            'any.required':'contact number is required field',
        }),
        password:Joi.string().required().messages({
            'string.base':'password should of string type',
            'string.empty':"password can not be empty",
            'any.required':'password is required field',
        }),
        userType:Joi.string().required().messages({
            'string.base':'userType should of string type',
            'string.empty':"userType can not be empty",
            'any.required':'userType is required field',
        })
    })
   
    return schema.validate(req.body);
}

export const roommate_validator=async(req)=>{
    const schema=Joi.object({
        ownerName:Joi.string().required().messages({
            'string.base':'address should of string type',
            'string.empty':"address can not be empty",
            'any.required':'address is required field',
        }),
        ownerMobile:Joi.string().required().messages({
            'string.base':'images should of string type',
            'string.empty':"images can not be empty",
            'any.required':'images is required field',
        }),
        address:Joi.string().required().messages({
            'string.base':'mobile should of string type',
            'string.empty':"mobile can not be empty",
            'any.required':'mobile is required field',
        }),
        image:Joi.string().required().messages({
            'string.base':'email should of string type',
            'string.empty':"email can not be empty",
            'any.required':'email is required field',
        })
    })
    return schema.validate(req.body);
}