const express = require('express');
const router = express.Router();
// Import Users
const { createUsers, getAllUsers, getUsersDetail, updateUsers, deleteUsers } = require('../handler/v1/users');
// Import Profiles
const { createProfiles, getAllProfiles, getProfilesDetail, updateProfiles, deleteProfiles } = require('../handler/v1/profiles');
// Import Bank_Accounts
const { createBankAccounts, getAllBankAccounts, getBankAccountsDetail, deleteBankAccounts, updateBankAccounts } = require('../handler/v1/bank_accounts');
// Import Transactions


// url main
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

// router url bank_accounts
router.post('/bank_accounts', createBankAccounts);
router.get('/bank_accounts', getAllBankAccounts);
router.get('/bank_accounts/:id', getBankAccountsDetail);
router.put('/bank_accounts/:id', updateBankAccounts);
router.delete('/bank_accounts/:id', deleteBankAccounts);

// router url transactions



// Export module Router
module.exports = router;