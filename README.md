# Tekteilen

#### Tekteilen (German for ‘sharing-tech’) is a portal for connecting organizations needing help with web-technologies and developers wanting to share their experience to support good causes. 

Users can sign up, describe the skills they have, and then find projects that they have the ability to contribute to. 

Once part of a project, developers will have the ability to communicate internally about the project via the discussion boards available for each project.

Each User is assigned a ‘Merit’ score at the very beginning, and it increases every time they participate in a project.  



## Visit Tekteilen
https://tekteilen-app.netlify.com



## Tech Stack

### Database
* PostgreSQL
* Knex.js

### Server
*  Node.js
*  Express.js
*  Custom Authentication Middleware

### Client Technologies
* React.js
* Redux
* Moment.js
* Toastr


## Endpoints

### Users ('/users')
* GET
* POST

### Projects ('/projects')
* GET
* POST
* PUT
* DELETE

## COMMENTS ('/comments')
* GET
* POST
* PUT
* DELETE





## Codebase
This root component for tekteilen is 'App.js', which contains a router and renders different pages conditionally depending on the URL. The app contains a global state using Redux, keeping track of such things as:
* The array of projects downloaded from the server
* Whether or not the app should redirect to specific pages
* The users list downloaded from the server (excluding their passwords and other private information, of course!
* Whether or not the app is experiencing an Error
* The comments associated with projects
* Logged in user information and Auth Token
* Whether or not to show modal dialogues such as the logout dialogue.
* The Status of the app Loading Spinner



## Mobile View
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/Screenshot_24.png "Mobile View")


## Landing Page
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/homescreen.png "Homescreen")

## User Dashboard
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/tekteilen-dashboard.png "User Dashboard")

## View an Individual Project
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/project-dashboard.png "Individual Project")

## Viewing Available Projects
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/allprojects.png "View All Projects")

## Submit A Project
![alt text](https://github.com/evang522/tekteilen-client/blob/master/public/newproject.png "Submit A Project")


