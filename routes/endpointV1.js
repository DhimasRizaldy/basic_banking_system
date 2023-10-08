const express = require('express');
const router = express.Router();
const { createUsers, getAllUsers, getUsersDetail, updateUsers, deleteUsers } = require('../handler/v1/users');
const { createProfiles, getAllProfiles, getProfilesDetail, updateProfiles, deleteProfiles } = require('../handler/v1/profiles');

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'welcome to challenge api - chapter 4 - with prisma',
        data: null
    });
});

// router url users
router.post('/users', createUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersDetail);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);

// router url profiles
router.post('/profiles', createProfiles);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:id', getProfilesDetail);
router.put('/profiles/:id', updateProfiles);
router.delete('/profiles/:id', deleteProfiles);


// Export module Router
module.exports = router;