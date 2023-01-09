# Customer-Address
This project is node.js back-end code for relation between customer table and address table using primary key and foreign key in which we can perform some CRUD + optimized APIs + Sync Database feuture.
In this project, I have created the Sync functionality --> When I need to send the existing data from SQLite offline database to Online Postgres server, I defined a controller in which it checks whether we have some existing data or not. If data exists, it will send all the data to the postgres server by calling the API. After syncing the data, the existing SQLite database will be erased. 

<br/>

## Features

>**Customer Account Creation**
- You can create customer with his/her name, mobile no. and email.

>**Customer Address Creation with CustomerID**
- You can create an address of customer using the customerID.

>**Fetching Customers**
- You can fetch all customers.

>**Fetching single customer with CustomerID**
- You can fetch customer using the customerID.

>**Fetching Addresses**
- You can fetch all addresses.

>**Fetching single address with addressID**
- You can fetch an address using the addressID.

>**Updating Customer Data**
- You can update the customer data using customerID.

>**Updating Address Data**
- You can update an address data using the addressID.

>**Delete Customer Data**
- You can delete an customer using the customerID.

>**Delete Address Data**
- You can delete an address using the addressID.

<br/>

## Dependencies
|npm modules|
|-|
|express|
|sqlite|
|dotenv|
|body-parser|
|http-status-codes|

<br/>

## REST API paths

>**Customer creation and operations**

- **System Check**<br/>
`GET /`<br/>
This is for system check.<br/><br/>

- **Create Customer**<br/>
`POST /user`<br/>
Register a customer with name, mobile, email.<br/><br/>

- **Create Address**<br/>
`POST /address`<br/>\
Create an address with city, state and country using customerID.<br/><br/>

- **Get all Customers (With address)**<br/>
`GET /users/add`<br/>
You will get all the customers with their particular address.<br/><br/>

- **Get all Customers(Without address)**<br/>
`GET /users`<br/>
You will get all the customers without address.<br/><br/>

- **Get all Address with CustomerID**<br/>
`GET /address`<br/>
You will get all the address with customerID.<br/><br/>

- **Get Single Customer**<br/>
`GET /user/:id`<br/>
You will get single customer as per customerID.<br/><br/>

- **Get Single Address**<br/>
`GET /address/:id`<br/>
You will get single address as per addressID.<br/><br/>

- **Update Customer data**<br/>
`PUT /user/:id`<br/>
You can update the data of the customer by customerId.<br/><br/>

- **Update Address data**<br/>
`PUT /address/:id`<br/>
You can update the data of the customer address by addressId.<br/><br/>

- **Delete Customer data**</br>
`DELETE /user/:id`</br>
You can delete the data of the customer by customerID.</br></br>

- **Delete Customer data**</br>
`DELETE /address/:id`</br>
You can delete the data of the customer address by addressID.</br></br>

- **Sync Database to Postgres**<br/>
`POST /sync/database`<br/>\
Sync the existing offline SQLite database to the online postgres server. After Sync, the existing offline SQLite data will be removed.<br/><br/>