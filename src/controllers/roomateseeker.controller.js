import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadRoomCloudinary.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Roommate } from "../model/roommate.model.js";
import { apiResponse } from "../utils/apiResponse.js";


const addDetails = asyncHandler( async(req, res) => {
    // get all details from the request body
    const {address, price, roomType, roomFor, bhk, near_landmark, extra_detail, ownerName, ownerMobile, lat, lng} = req.body;

    // checking that all neccesary fields are present
    if ( [address, price, roomType, roomFor, bhk, ownerName, ownerMobile].some((field) => field?.trim() === "") ){
        throw new ApiError(400, "All fields are required");
    }

    // getting room images
    const houseImage = req.files;
    const localRoomsImagePath = [];
    houseImage.map( (item) => (
        localRoomsImagePath.push(item.path)
    ) )

    const imagesUrl = await uploadOnCloudinary(localRoomsImagePath);

    // get the current user
    const currentUser = req.user;
    const user = await User.findById( currentUser._id);
    // console.log("user", user)
    if( !user ) throw new ApiError(500, "user not found");

    // add all the details to the database
    const addHouseDetail = await Roommate.create({
        _userId: user._id,
        address,
        roomImage: imagesUrl,
        description:{
            price,
            roomType,
            roomFor,
            details:{
                bhk,
                near_landmark,
                extra_detail,
                ownerMobile,
                ownerName,
            },
            location:{
                lat,
                lng
            },
        }
    })

    addHouseDetail.save()
    if (!addHouseDetail )throw new ApiError(400, "not able to add details");

    return res
        .status(200)
        .json(new apiResponse(200, {addHouseDetail}, "House address added successfully"))
})

const removeDetails = asyncHandler( async(req, res) => {
    const currentUser = req.user;

    const currentAddress = await Roommate.findById("67700e721541b7f49b2b094c");
    console.log(currentAddress);
    const deletedHouse = await Roommate.deleteOne({_id: "67700e721541b7f49b2b094c"})
    if ( !deletedHouse ) throw new ApiError(500, "Unable to delete the data")

    return res
        .status(200)
        .json(new apiResponse(200,{}, "successfully delete the user house details"))
});

const updateRoomDetails = asyncHandler( async(req, res) => {
});

export { addDetails, removeDetails, updateRoomDetails }