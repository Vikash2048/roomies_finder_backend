class errorHandling extends Error {
    constructor(statusCode,
        message="Something went wrong",
        errors = []
    ){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.success = false;
    }
}
const sendErroWithMessage=async(req,res,statusCode,message="Something went wrong")=>{
   return res.status(statusCode).json({
           response_code:statusCode,
           key_error:{
               message:message
           }
   })
}

export default {errorHandling,sendErroWithMessage};