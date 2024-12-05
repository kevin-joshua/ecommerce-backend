Here’s an updated version of the README with the rest of the endpoints included:

---

# Ecommerce Backend API

The **Ecommerce Backend API** is a simple server built using **Typescript**, **Express** and **MongoDB**, designed to manage user data. It supports common CRUD operations and is set up for easy deployment to **Vercel**.

## Features

- User management (Create, Read, Update, Delete).
- Integration with MongoDB for data storage.
- TypeScript for type-safe development.
- Custom error handling middleware.
- Designed for deployment on Vercel with serverless functions.

## Endpoints

- **POST** `/api/users`: Create a new user.
- **GET** `/api/users/:id`: Retrieve user details by ID.
- **PUT** `/api/users/:id`: Update user information.
- **DELETE** `/api/users/:id`: Delete a user by ID.
- **GET** `/api/users`: Retrieve all users.
- **PATCH** `/api/users/:id`: Update partial user data.
  
## Deployment

This API is optimized for **Vercel** deployment, ensuring a smooth serverless experience. 

