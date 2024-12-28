import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import Landlord from "../model/landlord_model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/uploadRoomCloudinary.js";


const addDetails = asyncHandler( async( req, res ) => {
    // get all details
    const { address, mobile, price, roomType, roomFor, bhk, nearLandMark, extraDetail, lat, lng } = req.body;
    // check that all value are present 
    if ( [address, mobile, price, roomType, roomFor, bhk ].some((field) => field?.trim() === "") ){
        throw new ApiError(400, "All field are required");
    }

    //getting room images
    const houseImage = req.files;
    const localRoomsImagePath = [];
    houseImage.map( (item) => (
        localRoomsImagePath.push(item.path)
    ) )

    const imagesUrl = await uploadOnCloudinary(localRoomsImagePath);
    
    // get the current user
    const currentUser = req.user;
    const user = await User.findById( currentUser._id);
    console.log("user", user)
    if( !user ) throw new ApiError(500, "user not found");

    // add all the details to the database
    const addHouseDetail = await Landlord.create({
        _userId: user._id,
        address,
        mobile,
        roomImage: imagesUrl,
        description:{
            price,
            roomType,
            roomFor,
            details:{
                bhk,
                nearLandMark,
                extraDetail,
            },
            location:{
                lat,
                lng
            },
        }
    })

    addHouseDetail.save()
    if (!addHouseDetail )throw new ApiError(400, "not able to add details")

    return res
        .status(200)
        .json(new apiResponse(200, {addHouseDetail}, "House address added successfully"))
});

const removeDetails = asyncHandler( async( req, res) => {
    //get the current User
    const currentUser = req.user;

    const currentAddress = await Landlord.findById("6761b3d5b5c3507968fc2391");

    const deletedUser = await Landlord.deleteOne(currentAddress)
    if ( !deletedUser ) throw new ApiError(500, "Unable to delete the data")

    return res
        .status(200)
        .json(new apiResponse(200,{}, "successfully delete the user house details"))
})

const getAllRooms = asyncHandler( async(req, res) => {
    const currentUser = req.user;
    // console.log("current user : ", currentUser)
    const allRooms = await Landlord.find({_userId: currentUser._id})
    if (!allRooms) throw new ApiError(400, "not able to get all content of user")
    // console.log(allRooms)

    return res
        .status(200)
        .json(new apiResponse(200, {allRooms}, "Successfully abstract the User house details"))
})

const getSingleRooms = asyncHandler( async(req, res) => {
    const currentRoomId = req.currentRoomId;

    const room = await Landlord.findById(currentRoomId._id);
    if ( !room ) throw new ApiError(400,"not able to fetch the single room")

    return res
        .status(200)
        .json(new apiResponse(200, {room}, "Successfully fetch the data"))
})

const updateRoomDetails = asyncHandler( async(req, res) =>{
})



export { addDetails, removeDetails, getAllRooms, getSingleRooms, updateRoomDetails }