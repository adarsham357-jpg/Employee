# Employee Management System

A full-stack web application for managing employee information with Create, Read, Update, and Delete (CRUD) operations.

## Features

- Add, view, edit, and delete employee records
- Employee information includes name, role, and salary
- Responsive web interface
- Real-time data persistence with MongoDB
- RESTful API for employee management

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Development**: Nodemon for hot reloading

## Prerequisites

- Node.js (version 12 or higher)
- MongoDB (local or remote instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Setup

1. Ensure MongoDB is running on your system
2. The application will connect to MongoDB at `mongodb://localhost:27017/employeeDB` by default

## Usage

### Development Mode

To run the application in development mode with hot reloading:
```bash
npm run dev
```

### Production Mode

To run the application in production mode:
```bash
npm start
```

### Accessing the Application

After starting the server, open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get a specific employee
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/:id` - Update an existing employee
- `DELETE /api/employees/:id` - Delete an employee

## Project Structure

```
employee-management-system/
├── models/
│   └── Employee.js          # Mongoose model
├── public/
│   ├── index.html           # Main HTML file
│   └── script.js            # Client-side JavaScript
├── routes/
│   └── employees.js         # API routes
├── server.js                # Entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.