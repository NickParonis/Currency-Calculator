# Currency Conversion Application Documentation

## **Technologies Used**
- **Backend**: Node.js, Express.js  
- **Frontend**: React, Axios  
- **Database**: MongoDB  

---

## **How to Run the Application**
### Prerequisites  
- Ensure you have **Node.js** and **npm** installed on your machine. The versions used are:  
  - Node: `v18.17.1`  
  - npm: `v9.6.7`  

### Backend Setup  
1. Navigate to the `server` folder using the terminal.  
2. Install dependencies by running:  
   ```bash
   npm install
3. Once the dependencies are installed run ‘npm start’ command.
Server should be connected to the database and there should be ‘Database connection:
success’ written in the console.

### Frontend Setup
1. Navigate from the terminal to the client folder.
2. Install dependencies by running:  
   ```bash
   npm install
3. Once the dependencies are installed run ‘npm start’ command.
4. Open your browser and navigate to http://localhost:3000/
Login screen should appear in the browser. You can click ‘continue as guest’ or use the
following credentials to login as administrator and get access to some protected endpoints.
email: test2@test.com password: 1234


## **How the Application Works**
User Authentication: Users can sign up and log in to the application using their email and
password. The backend verifies the user credentials and generates a JSON Web Token
(JWT) for authentication.
Currency Conversion: Users can select the base currency and the target currency for
conversion. The frontend sends a request to the backend, which calculates the conversion
based on the provided exchange rates and returns the result to the user interface.
Currency Management: Administrators can add new currencies to the system with their
corresponding conversion rates. They can also update the conversion rates of existing
currencies as needed.
Authorization and Authentication: The backend ensures that only authenticated users can
access certain routes, and only authorized administrators can perform specific actions, such
as adding and updating currencies.


## **Database and Currency value.**
Every currency has a specific value. The currency value is in comparison to the Euro.
For example USD has a value of 0.7265 since 1 USD is 0.7265 Euros.
The database only holds information about the currency name and its ratio to euro.

When adding a new Currency to the database, only the name of the currency and its ratio to
euro is needed, since the Euro is set as the base currency for our application.


## **Use the API via postman.**
You can also use the API endpoints in the application via postman.
1. Follow the backend steps to run the server as listed above.
2. Download Postman: https://www.postman.com/downloads/
3. Import the postman collection attached in the email by clicking “Import” in the
postman application.

UpdateCurrency, PostCurrency and DeleteCurrency are protected endpoints and to get a
proper response from the server you need to put a valid token in the headers.

The token is generated in the server and can be taken after using SignupUser or LoginUser
requests

Lastly, there are endpoints you can use in the postman but are not implemented in the
frontend.
For example you can delete a currency with the DeleteCurrency request by providing the _id
of the currency in the URL and the admin token in the headers and also you can create a new user and give him an admin or user role with the signup
POST request. This endpoint has no protection for testing purposes.

If the role is not provided in the body, the user will be created automatically as ‘user’ role.
