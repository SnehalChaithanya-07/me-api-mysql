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


