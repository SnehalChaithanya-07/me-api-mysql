# Me API Playground (MySQL)

This project is a simple backend API built using Node.js and MySQL.
It allows storing a personal profile, searching skills, and checking
the backend health. A basic HTML + JavaScript frontend is used to
consume the APIs.

## Tech Stack
- Node.js
- Express
- MySQL
- HTML, JavaScript

## Database Setup
1. Open MySQL
2. Run the commands from `schema.sql`
3. Make sure the database name is `meapi`

## How to Run the Project
1. Clone the repository
2. Go to backend folder
3. Install dependencies:
   npm install
4. Start server:
   node server.js
5. Open `frontend/index.html` in browser

## API Endpoints
- GET /health  
- POST /profile  
- GET /profile  
- GET /profile/search?skill=Java  

## Notes
- This project is designed for a single-user profile
- MySQL strict group-by issue was handled using aggregation
- Duplicate skill search results were handled using DISTINCT

## Project Overview
I built a backend API using Node.js and MySQL that supports profile creation, skill search, and a health check endpoint. A simple HTML and JavaScript frontend consumes these APIs.

## Resume
You can view my resume here:  
[View Resume](https://drive.google.com/file/d/14QWgi9k6_TdxAVFHA-4KRQaa3vRW7SKW/view?usp=sharing)


## Remarks

### Limitations
- This project is designed for a single-user profile use case.
- Authentication and authorization are not implemented.
- Error handling is kept minimal to maintain simplicity.

### Trade-offs
- MySQL was chosen over NoSQL for structured and relational data.
- The frontend UI is intentionally minimal to focus on backend functionality.
- Hardcoded configuration is used for local setup to reduce complexity.

### What I Would Do Next
- Add authentication for write operations.
- Improve validation and error handling.
- Add pagination and rate limiting for APIs.
- Deploy database and backend with environment-based configuration.


## Live URLs
- Backend API: https://me-api-mysql.onrender.com
- Health Check: https://me-api-mysql.onrender.com/health
- Frontend App: https://6968d1570337b1aab801549f--fascinating-longma-f06c45.netlify.app/
