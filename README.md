# MERN stack web application

Fullstack implementation of a simple web application in MERN stack. \
MongoDB records are saved remotely in a DB. The DB is accessed via .env in `server`. \
GraphQL was used for API calls from `client` ( frontend ) and the `server` ( backend ). 

## Frontend

React.js and Bootstrap were used during frontend development. \
Will not use Bootstrap again. An alternative to that could be Tailwind or MUI.

## Project Screenshots - Frontend
![graphql_frontend_Image_1](https://i.postimg.cc/dt0RvrtT/Screenshot-1.png)
<br>
![graphql_frontend_Image_2](https://i.postimg.cc/q7c62vvT/Screenshot-2.png)
<br>
![graphql_frontend_Image_3](https://i.postimg.cc/BQxjrv21/Screenshot-3.png)
<br>

## Backend

The data is saved in a MongoDB database. \
Mongoose was used for creating DB schemasas well as data validation. \
GraphQL was used instead of REST for API calls. \
GraphiQL, an extension of GraphQL, was used to provide the developer \
a mean to read/write to the DB via API calls rather than direct CRUD operations on DB. 

## Project Screenshots - Backend
GraphQL was truly helpful with state management, and such libs as \
Redux or the Context are not necessary in small apps as this one. 


![graphql_backend_Image_1](https://i.postimg.cc/3rLZ6nCv/Screenshot-12.png)
<br>
![graphql_backend_Image_4](https://i.postimg.cc/13njmL56/Screenshot-4.png)
<br>

## Available Scripts
### In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode ( with nodemon ).\
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view the backend in your browser.

### `npm start`

Runs the app in the development mode ( without nodemon )\
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view the backend in your browser.

### In the project directory `client` ( which can be accesed by typing the command: `cd client` ), you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.
