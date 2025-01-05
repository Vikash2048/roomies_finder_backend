import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadRoomCloudinary.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Roommate } from "../model/roommate.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getCoordinates } from "../utils/getCoordinates.js";


const addDetails = asyncHandler( async(req, res) => {
    // get all details from the request body
    const {address, price, roomType, roomFor, bhk, near_landmark, extra_detail, ownerName, ownerMobile} = req.body;

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

    // converting location into Geocordinates 
    const { lat, lng } = await getCoordinates(address);
    if ( !lat || !lng ) throw new ApiError(401, "not able to convert location into coordinates")

    const checkIfAlreadyAddHouse = await Roommate.exists({ _userId:currentUser._id})
    if (checkIfAlreadyAddHouse) throw new ApiError(400, "user already added one house cannot add more");


    if( !user ) throw new ApiError(500, "user not found");

    // add all the details to the databasere
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

    const currentAddress = await Roommate.findById("67700e721541b7f49b2b094c");  // need to add the id
    console.log(currentAddress);
    const deletedHouse = await Roommate.deleteOne({_id: "67700e721541b7f49b2b094c"})  // need to add the id
    if ( !deletedHouse ) throw new ApiError(500, "Unable to delete the data")

    return res
        .status(200)
        .json(new apiResponse(200,{}, "successfully delete the user house details"))
});

const updateRoomDetails = asyncHandler( async(req, res) => {
    const {address, price, roomType, roomFor, bhk, near_landmark, extra_detail, ownerName, ownerMobile} = req.body;

    if ( [address, price, roomType, roomFor, bhk, ownerName, ownerMobile].some((field) => field?.trim() === "") ){
        throw new ApiError(400, "All fields are required");
    }

    const houseImage = req.files;
    const localRoomsImagePath = [];
    let imagesUrl = null;

    if(houseImage !== null) {
        houseImage.map( (item) => (
            localRoomsImagePath.push(item.path)
        ) )

        imagesUrl = await uploadOnCloudinary(localRoomsImagePath);
    }
    
    const currentUser = req.user;
    const user = await User.findById( currentUser._id);
    if( !user ) throw new ApiError(500, "user not found");

    const { lat, lng } = await getCoordinates(address);
    if ( !lat || !lng ) throw new ApiError(401, "not able to convert location into coordinates")

    const updateHouseDetail = await Roommate.updateOne({
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

    updateHouseDetail.save()
    if (!updateHouseDetail )throw new ApiError(400, "not able to update details");

    return res
        .status(200)
        .json(new apiResponse(200, {updateHouseDetail}, "House address updated successfully"))
});

export { addDetails, removeDetails, updateRoomDetails }