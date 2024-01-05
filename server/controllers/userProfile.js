const Profile = require('../models/userProfile');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');


const createProfile = async(req, res) =>{
    // res.send(req.body);  
    // console.log(req.body);
    req.body.createdBy = req.user.userId;
    // console.log(req.body.createdBy);
    try {
        const profile = await Profile.create(req.body);
        res.status(StatusCodes.CREATED).json({profile}); // depends on what we want to show on our front end
        // console.log(profile);   
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.NOT_FOUND).json({error});
    }
}

const getProfile = async(req, res) => {
    const {
        user:{userId},                                    //id:profileId (give alias to id)
        params: {id:profileId},                         // nested destructuring is done here to get a profile of a particular user
    } = req
    console.log(req.user);
    console.log(req.params);
    const getUserProfile = await Profile.find
    (
        {
           
            createdBy: userId,
        }
    );
    // console.log(getUserProfile);
    if(!getUserProfile){
        throw new NotFoundError(`No profile with id ${profileId}`);
    }
    res.status(StatusCodes.OK).json({getUserProfile});
}

const updateProfile = async(req, res) => {
    const {
        body : {username, bio, city, skills, interests},
        user: { userId },                                    
        params: {id:profileId},                         
    } = req
    if(username === ''){
        throw new BadRequestError("Username can't be empty");
    }
    const updatedProfile = await Profile.findByIdAndUpdate({_id:profileId, createdBy: userId}, req.body, {new: true,
    runValidators: true});
    if(!updatedProfile){
        throw new NotFoundError(`No profile with id ${profileId}`)
    }
    // console.log("profile updated");
    res.status(StatusCodes.OK).json({updatedProfile})
}

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
}