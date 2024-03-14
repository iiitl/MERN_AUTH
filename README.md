## Description

This is  MERN auth application 


It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register.
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- React frontend to register, login, logout.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
PORT = 4000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
cd backend
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:4000)
npm start

```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
