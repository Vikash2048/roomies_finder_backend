import { HTTPS } from "../constant.js";
import validators from "../Core/validators.js";
import errorHandling from '../utils/errorHandling.js'
export const landlord_address_params=async(req,res,next)=>{
    try {
      
      const  {error} = await validators.landlord_address_validator(req);
      if (error) {
        return errorHandling.sendErroWithMessage(req,res,HTTPS.HTTP_BAD_REQUEST,error.details[0].message,
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };


