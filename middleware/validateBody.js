const {StatusCodes, ReasonPhrases, getStatusCode} = require("http-status-codes")
const db = require("../model")

const validateSignUp = (req, res, next) =>{
    if(!req.body.name){
        res.status(StatusCodes.FORBIDDEN).send({
            status : StatusCodes.FORBIDDEN,
            response : ReasonPhrases.FORBIDDEN,
            message : "Fill the name"
        })
        return;
    }

    
    if(!req.body.email){
        res.status(StatusCodes.FORBIDDEN).send({
            status : StatusCodes.FORBIDDEN,
            response : ReasonPhrases.FORBIDDEN,
            message : "Fill the email",
        })
        return;
    }
    if(!req.body.mobile){
        res.status(StatusCodes.FORBIDDEN).send({
            status : StatusCodes.FORBIDDEN,
            response : ReasonPhrases.FORBIDDEN,
            message : "Fill the mobile"
        })
        return;
    } else {
        let emailExist = `SELECT * FROM customers WHERE email=?`;
        db.get(emailExist, [req.body.email], (err, email) => {
            if (err) {
                console.log('Error While the Checking the Email is Exists or not', err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
                return;
            }
            else {
                if (email) {
                    res.status(StatusCodes.FORBIDDEN).send({
                        status: StatusCodes.FORBIDDEN,
                        response: ReasonPhrases.FORBIDDEN,
                        message: "Email is already taken !"
                    });
                    return;
                }
                else {
                    let mobileExist = `SELECT * FROM customers WHERE mobile=?`
                    db.get(mobileExist, [req.body.mobile], (err, mobile) => {

                        if (err) {
                            console.log('Error While Checking the Mobile is Exists or not', err);
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
                            return;
                        }
                        else {
                            if (mobile) {
                                res.status(StatusCodes.FORBIDDEN).send({
                                    status: StatusCodes.FORBIDDEN,
                                    response: ReasonPhrases.FORBIDDEN,
                                    message: "Mobile No is already taken !"
                                });
                                return;
                            }
                            else {
                                next();
                            }
                        }
                    })
                }
            }
        })
    }
} 



const validateBody = {
    validateSignUp : validateSignUp
}
module.exports = validateBody;