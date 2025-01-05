import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import Landlord from "../model/landlord_model.js";
import { Roommate } from "../model/roommate.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getCoordinates } from "../utils/getCoordinates.js"
import { User } from "../model/user.model.js";

const searchHouses = asyncHandler(async (req, res) => {
    const { location, withinRange } = req.query;

    const { lat,lng } = await getCoordinates(location);
    if ( !lat || !lng ) throw new ApiError(400, "unable to get the geoCoordinate of the user search location")

    const longitude = lng;
    const latitude = lat;  
    console.log(lat,lng);
    
    // Build the query object
    const query = {};

    // Add price condition if maxPrice or minPrice are provided
    // if (maxPrice) {
    //     query['description.price'] = { $lte: maxPrice };
    // }

    // if (minPrice) {
    //     if (!query['description.price']) query['description.price'] = {};
    //     query['description.price'].$gte = minPrice;
    // }

    // Add geospatial condition for location within range (if withinRange and userLat, userLng are provided)
    if (withinRange && lat && lng) {
        // Convert range from km to radians (1 km = 0.009 kilometers per radian)
        const radiusInRadians = withinRange / 6378; // 6378 is Earth's radius in km
        // Geospatial query: search for locations within the given range
        query['description.location'] = {
            $geoWithin: {
                $centerSphere: [
                    [latitude, longitude],  // [longitude, latitude]
                    radiusInRadians      // Range in radians
                ]
            }
        };
    }
    
    console.log("query",query)
    // Perform the query and fetch matching rooms
    const rooms = await Landlord.find(query);
    const room = await Roommate.find(query)
    console.log(rooms, room)

    // Return results
    if (rooms.length === 0) {
        return res.status(404).json(new apiResponse(404, [], "No matching rooms found"));
    }

    return res.status(200).json(new apiResponse(200, { rooms, room }, "Rooms found"));
});

const selectOne = asyncHandler(async (req, res) => {
    // recievice docId and userId
    // using userId find the userType
    // after finding that user type find that document from that db
    // return that document 
    const {docId, userId} = req.query;

    const selectedHouseUser = await User.findById({_id: userId});
    if( !selectedHouseUser) throw new ApiError(400, "selected house user not found")

    const selectedHouseUserType = selectedHouseUser.userType;

    const selectedHouse = null;

    if( selectedHouseUserType == "Landlord")
    {
        selectedHouse = await Landlord.findById({_id: docId});
        if(!selectedHouse) throw new ApiError(400, "not able to fetch selectedHouse")
    }
    else
    {
        selectedHouse = await Roommate.findById({_id: docId});
        if(!selectedHouse) throw new ApiError(400, "not able to fetch selectedHouse")
    }

    res
    .status(200)
    .json(new apiResponse(200, {selectedHouse}, "successfully selected one user"))

})


export { searchHouses, selectOne };
