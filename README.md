# Firstaid

Firstaid is an end-to-end user application, which can classified user's wound--different type of burns and cuts--using a trained machine learning model, then it would output on how the user should treat their wound. 

It is built on a MEAN stack with rounded authentication, and authorization; routing; and error handling from frontend to backend.

For more inforamtion on the machine learning model, please follow this link, https://github.com/rothauy/firstaid_model.

## Requirement

Run `npm install` to re-install all the missing packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:server` for a dev NodeJS server. Nagvigate to `http://localhost:3000/` to browse different API

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Runbook
####Signup

User will need to sign up with the code 'v#&t8k' to access the application. Once, the user signs up, the account will has a user status, which mean that they can only submit the picture under Result tab. They have no privilege of adding new wound or edit existing wound. 

## Other information

AWS LINK: http://firstaidnodeangular-env.fddx9qwi8y.us-east-2.elasticbeanstalk.com/

Test Login:

Admin: TestUser1@gmail.com Password: Test1234!

User: TestUser2@gmail.com Password: Test1234!

Register Code: v#&t8k

DEV:  mongo "mongodb+srv://cluster0-1hna2.mongodb.net/test"  --username firstaid --password d9M3I1518EB4pvS0

PROD: mongo "mongodb+srv://cluster0-nxq70.mongodb.net/test" --username FirstAid-NodeJs --password zRLfa2hwrFqO2Klg

DEV: "mongodb+srv://firstaid:d9M3I1518EB4pvS0@cluster0-1hna2.mongodb.net/test"

PROD: "mongodb+srv://FirstAid-NodeJs:zRLfa2hwrFqO2Klg@cluster0-nxq70.mongodb.net/test?retryWrites=true&w=majority"
