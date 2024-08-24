# Flight Search and Booking System - Backend
## Overview  
This is the backend service for the Flight Search and Booking System. It provides RESTFul APIs for searching flithts, managing boookings, processing payments, and handling user authentication and authorization. The backend is built with Node.js, Express, MongoDB, and integrates with the Stripe API for payment processing.

## Features  
* RESTFul APIs for flight search and booking management.
* Secure user authentication and role-based access control (RBAC).
* Payment processing using Stripe.
* Input validation and security protection (e.g. encrypted sensitive data, XSS protection).
* Basic logging for auditing and error handling.

## Tech Stack  
* Backend Framework: Node.js, Express.js
* Database: MongoDB, Mongoose
* Authentication: JSON Web Token (JWT), bcrypt
* Payments: Stripe API
* Security: Helmet.js, bcrypt, AES encryption
* Logging: Winston for logging errors and application events

## Setup Instructions  
Prerequisites  
* Node.js (v18.x or higher)
* MongDB (v4 or higher)
* Stripe API keys (for paymetn processing)

### 1. Clone the repository  
```bash
git@github.com:Thanasak1412/api-flight-booking-system.git
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the values with your own settings:
```bash
cp .env.example .env
```

### 4. Mock Data

### 5. Start the Backend Server
```bash
npm run dev
```
Ther server will start at `https://localhost:3001`.

### 6. API Endpoints
Here are the key API endpoints for the backend service:
* POST /api/v1/booking: Create a new booking for a flight, including payment processing via Stripe.
* GET /api/v1/flights/search: Search for flights based on origin, destination, and travel dates.
* GET /api/v1/locations: Retrive locations for flight options to search.
* POST /api/v1/auth/register: Register a new user.
* POST /api/v1/auth/login: Log in and receive a JWT token.

### 7. Error Handling and Logging
The backend uses `winston` for logging errors and important events. This helps with auditing and monitoring issues during operation.

## Postman Collection
[flight-booking-system.postman_collection.json](https://github.com/user-attachments/files/16737695/flight-booking-system.postman_collection.json)
