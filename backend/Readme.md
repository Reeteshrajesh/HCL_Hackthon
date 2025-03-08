# Bank Fund Transfer System

## Overview

This project is a bank fund transfer system that includes authentication and transaction tracking. It provides API endpoints to find the fastest and cheapest routes for fund transfers between banks.

## Features

- User authentication with JWT (Login/Logout)
- Token expiration in 5 minutes
- Load bank data from CSV into an in-memory SQLite database
- Find the fastest route based on transfer time
- Find the cheapest route based on bank charges
- Store transaction details temporarily

## Technologies Used

- Node.js
- Express.js
- SQLite (in-memory database)
- JWT for authentication
- bcrypt for password hashing
- Heap.js for Dijkstra's algorithm
- CSV Parsing for loading data

## Folder Structure

```
backend/
├── controllers/
│   ├── authController.js
│   ├── transactionController.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── models/
│   ├── database.js
│
├── routes/
│   ├── authRoutes.js
│   ├── transactionRoutes.js
│
├── utils/
│   ├── dijkstra.js
│
├── app.js
├── package.json
```

## Setup & Installation

### Prerequisites

- Node.js installed
- npm installed

### Steps to Run

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   node app.js
   ```

4. The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### Login

```
POST /api/auth/login
Body: { "username": "admin", "password": "password" }
Response: { "token": "<JWT_TOKEN>" }
```

#### Logout

```
POST /api/auth/logout
Response: { "message": "Logout successful" }
```

### Transactions (Requires Authentication)

#### Find Fastest Route

```
POST /api/transaction/fastestroute
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body: { "fromBank": "BIC1", "toBank": "BIC2" }
Response: { "route": "BIC1 -> BIC3 -> BIC2", "time": 15 }
```

#### Find Cheapest Route

```
POST /api/transaction/cheapestroute
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body: { "fromBank": "BIC1", "toBank": "BIC2" }
Response: { "route": "BIC1 -> BIC4 -> BIC2", "cost": 10.5 }
```

## License

This project is licensed under the MIT License.
