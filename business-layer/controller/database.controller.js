const db = require('../model');
const { Client } = require('pg');

const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const navigator = require('navigator');

exports.sync = async (req, res) => {
    try {
        const online = navigator.onLine
        console.log('User online : ' + online)
        if (online) {
            const client = new Client({
                host: "localhost",
                user: "postgres",
                port: 5432,
                password: "lalit123",
                database: "customeradd"
            });

            client.connect((err) => {
                if (err) {
                    console.log(`connection error`, err.stack);
                } else {
                    console.log(`Successfully connected to PostgreSQL`);
                }
            });

            // checking the table is exists or not 
            const customerTable = await client.query(`
            SELECT EXISTS(
                SELECT * 
                FROM information_schema.tables 
                WHERE  
                  table_name = 'customers'
            );
            `)
            if (!customerTable.rows[0].exists) {
                //creating the userTable for postgreSql
                const createCustomerTable = await client.query(`CREATE TABLE IF NOT EXISTS customers (
                        customerID serial primary key,
                        name text,
                        mobile bigint,
                        email text)`);
                console.log("Successfully Created the Customer Table", createCustomerTable);
            }

            // fetching the data from sqlite
            //customer data
            db.all(`SELECT * FROM customers`, (err, result) => {
                if (err) {
                    console.log('Error while fetching the customers data ' + err);
                }
                else {
                    // console.log(result);
                    result.forEach(async(customer) => {
                        let insert = `INSERT INTO customers(customerID, name, mobile, email) VALUES($1,$2,$3,$4) RETURNING *`
                        let values = [customer.customerID, customer.name, customer.mobile, customer.email];
                        console.log(values);
                        const response = await client.query(insert, values);
                        // console.log(response);
                    })
                }
            })
            // checking the table is exists or not 
            // const addressTable = await client.query(`
            // SELECT EXISTS(
            //     SELECT * 
            //     FROM information_schema.tables 
            //     WHERE  
            //       table_name = 'address'
            // );
            // `)
            // if (!addressTable.rows[0].exists) {
            //     //creating the addressTable for postgreSql
            //     const createAddressTable = await client.query(`CREATE TABLE IF NOT EXISTS address (
            //             addressID serial primary key,
            //             city text,
            //             state text,
            //             country text,
            //             customerID integer,
            //             constraint fk_customerID
            //             foreign key(customerID) references customers(customerID) on update cascade on delete cascade)`);
            //     console.log("Successfully Created the address Table");
            // }

            // // fetching the data from sqlite
            // //customer data
            // db.all(`SELECT * FROM address`, (err, result) => {
            //     if (err) {
            //         console.log('Error while fetching the address data ' + err);
            //     }
            //     else {
            //         // console.log(result);
            //         result.forEach(async(address) => {
            //             let insert = `INSERT INTO address(city, state, country, customerID) VALUES($1,$2,$3,$4) RETURNING *`
            //             let values = [address.city, address.state, address.country, address.customerID];
            //             console.log(values);
            //             const response = await client.query(insert, values);
            //             // console.log(response);
            //         })
            //     }
            // })

            // clean local database;
            db.run(`DELETE FROM customers;`,(err)=>{
                if(err){
                    console.log(`Some error while clearing local storage ${err}`);
                }
                else{
                    console.log('Successfully clear the customers data');
                }
            })
            // db.run(`DELETE FROM address;`,(err)=>{
            //     if(err){
            //         console.log(`Some error while clearing local storage ${err}`);
            //     }
            //     else{
            //         console.log('Successfully clear the address data');
            //     }
            // })

            res.status(StatusCodes.ACCEPTED).send({
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED,
                message : "Successfully Synced the Database"
            })

        }
        else {
            res.status(StatusCodes.BAD_REQUEST).send({
                status: StatusCodes.BAD_REQUEST,
                response: ReasonPhrases.BAD_REQUEST
            })
        }
    }
    catch (err) {
        console.log(`Error while the Database Sync ${err}!!!`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}