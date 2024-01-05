// personal profile route
const express = require('express');
const router = express.Router();

const{
    createProfile,
    getProfile,
    updateProfile,
    // deleteProfile
} = require('../controllers/userProfile');

router.route('/').post(createProfile);
router.route('/:id').get(getProfile).patch(updateProfile);

module.exports = router;