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
#### Signup

User will need to sign up with the code 'v#&t8k' to access the application. Once, the user signs up, the account will has a user status, which mean that they can only submit the picture under Result tab. They have no privilege of adding new wound or edit existing wound. 

#### Login

User will need to login to access the application functionality and to keep their previous scan history. 

#### Result Tab

It only shows when the user login. Within the tab, there is a function that requires user to input a picture of their wound for the model to classify, then it will tell the user what type of wound they have and how to take care of that. It also keeps track of previous submission. 

#### Home/Classification

This page showcases all the type of wounds that the model can classify and other information. 

#### Manage

This page contains all user information. User can also edit their existing information, excluding email (PK). 

#### Logout

This is a logout function that it clears user's token session.
