const db = require("../model");
const {ReasonPhrases, StatusCodes} = require("http-status-codes");
const authConfig = require("../config/auth.config")

exports.signup = (req, res) =>{
    const userObj = {
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile
    }

    let sql = `INSERT INTO customers (name, email, mobile) VALUES (?,?,?)`
    let values = [userObj.name, userObj.mobile, userObj.email];

    db.all(sql, values, function(err, result){
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }
        else{
            console.log('Customer Created', result);
            res.status(StatusCodes.CREATED).send({
                message : "Customer has been created successfully",
                status : StatusCodes.CREATED,
                response : ReasonPhrases.CREATED,
                data : userObj
            })
        }
    })
}

exports.getAllUser = (req, res) =>{
    let sql = `SELECT * FROM customers`;
    let params = [];
    db.all(sql, params, (err, users) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(users){
                res.status(StatusCodes.OK).send({
                    message : "List of all the customers",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : users
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}


// all customers with address
exports.getAllUserwithAdd = (req, res) =>{
    let sql = `select a.customerName, c.mobile, c.email, a.city, a.state, a.country
    from customers c 
    left join address a 
    on a.customerID = c.customerID `;
    let params = [];
    db.all(sql, params, (err, users, address) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(users, address){
                res.status(StatusCodes.OK).send({
                    message : "List of all the customers with address",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : {users, address}
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}



// Get all address
exports.getAllAddress = (req, res) =>{
    let sql = `SELECT * FROM address`;
    let params = [];
    db.all(sql, params, (err, address) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(address){
                res.status(StatusCodes.OK).send({
                    message : "List of all the address",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : address
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}


exports.getUser = (req, res) => {
    let sql = `SELECT * FROM customers WHERE customerID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(user){
                res.status(StatusCodes.OK).send({
                    message : "Single customer",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : user
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}

// Single customer with address
exports.getUserwithAdd = (req, res) => {
    let sql = `select c.*,a.*
    from Customers c
    left join Address a
    on a.cid = c.customerID
    where  case when c.customerID =? then 1=1 else  c.customerID=? end`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(user){
                res.status(StatusCodes.OK).send({
                    message : "Single Customer",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : user
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}



exports.updateUser = (req, res)=>{

    let userObj = {
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile
    }

    let sql = `UPDATE user set
                name = coalesce(?, name),
                email = coalesce(?, email),
                mobile = coalesce(?, mobile)
                WHERE id = ?`;
    let params = [userObj.name, userObj.email, userObj.mobile, req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.ACCEPTED).send({
                message : "User has been updated successfully",
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED
            })
            return;
        }
    })
}

exports.deleteUser = (req, res) =>{

    let sql = `DELETE FROM Customers WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.OK).send({
                message : "User has been removed",
                status : StatusCodes.OK,
                response : ReasonPhrases.OK
            })
            return;
        }
    })
}
