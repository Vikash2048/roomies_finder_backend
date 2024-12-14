import { user_validator } from "../Core/validators.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const user_params_validate = asyncHandler( async (req, res, next) => {
  const isValidate = await user_validator( req );
  if (isValidate.error) throw new ApiError(400, isValidate.error)
  next();
} )

