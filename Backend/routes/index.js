const allUsers = require('../controller/allUsers');
const getProduct = require('../controller/getProduct');
const updatedUser = require('../controller/updatedUser');
const updateProduct = require('../controller/updateProduct');
const uploadProduct = require('../controller/uploadProduct');
const userDetailsController = require('../controller/userDetails');
const userLogOut = require('../controller/userLogOut');
const userSignInController = require('../controller/userSignIn');
const userSignUpController = require('../controller/userSignUp');
const authToken = require('../middleware/authToken');

const router = require('express').Router();

router.post('/signup',userSignUpController);
router.post('/signin',userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogOut);

//admin router

router.get('/all-user',authToken,allUsers);
router.post('/update-user',authToken,updatedUser);

//upload Product

router.post('/upload-product',authToken,uploadProduct);
router.get('/get-product',getProduct);
router.post('/update-product',authToken,updateProduct);


module.exports = router;