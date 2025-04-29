const allUsers = require('../controller/userController/allUsers');
const getProduct = require('../controller/productController/getProduct');
const updatedUser = require('../controller/userController/updatedUser');
const updateProduct = require('../controller/productController/updateProduct');
const uploadProduct = require('../controller/productController/uploadProduct');
const userDetailsController = require('../controller/userController/userDetails');
const userLogOut = require('../controller/userController/userLogOut');
const userSignInController = require('../controller/userController/userSignIn');
const userSignUpController = require('../controller/userController/userSignUp');
const authToken = require('../middleware/authToken');
const { getCategoryProduct } = require('../controller/productController/getCategoryProduct');

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
router.get('/get-CategoryProduct', getCategoryProduct);


module.exports = router;