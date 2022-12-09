const authController = require('../controller/auth.controller');
const {validateBody} = require('../middleware/index');
module.exports = (app)=>{

    //  POST /user/signup
    app.post('/user', validateBody.validateSignUp , authController.signup);

    //  POST /user/signin
    // app.post('/user/signin/', validateBody.validateSignIn, authController.signIn);

     //  GET /user/:id
    app.get('/user/:id', authController.getUser);

    //  GET /users/
    app.get('/users', authController.getAllUser);

    //  PUT /user/:id
    app.put('/user/:id', authController.updateUser);

    //  DELETE /user/:id
    app.delete('/user/:id', authController.deleteUser);


    //GET all user with address
    app.get('/users/add', authController.getAllUserwithAdd);

    //Get all address
    app.get('/address', authController.getAllAddress);

    //GET single user with address
    app.get('/user/add/:id', authController.getUserwithAdd);

}