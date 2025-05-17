```markdown
# Task Tracker - MERN Stack Application


A full-stack task management application built with MongoDB, Express, React, and Node.js (MERN stack) with JWT authentication.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete projects
- Create, read, update, and delete tasks
- Task status tracking (Not Started, In Progress, Completed, On Hold)
- User dashboard with project overview
- Responsive design with Material-UI components

## Technologies Used

### Frontend
- React.js
- React Router
- Formik & Yup (form handling)
- Material-UI (UI components)
- Axios (HTTP client)
- JWT-decode (token decoding)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Tokens (JWT)
- Bcrypt.js (password hashing)
- CORS (Cross-Origin Resource Sharing)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas URI)
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | Login user                 |
| GET    | /api/auth/me       | Get current user           |
| GET    | /api/auth/logout   | Logout user                |

### Projects
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/projects     | Get all projects           |
| POST   | /api/projects     | Create a new project       |
| GET    | /api/projects/:id | Get single project         |
| PUT    | /api/projects/:id | Update project             |
| DELETE | /api/projects/:id | Delete project             |

### Tasks
| Method | Endpoint                          | Description                |
|--------|-----------------------------------|----------------------------|
| GET    | /api/projects/:projectId/tasks    | Get all tasks for project  |
| POST   | /api/projects/:projectId/tasks    | Create new task            |
| GET    | /api/tasks/:id                    | Get single task            |
| PUT    | /api/tasks/:id                    | Update task                |
| DELETE | /api/tasks/:id                    | Delete task                |

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mohan - mtm.kcs@gmail.com

Project Link: https://github.com/mohan7401647399/Task_tracker
```

## How to Use This README

1. Replace placeholder values (like `yourusername`, `your_mongodb_connection_string`, etc.) with your actual information
2. Add real screenshots to the `screenshots/` directory and update the image paths
3. Customize the features, installation steps, and other sections as needed
4. Add your own license if not using MIT
5. Include any additional sections that might be relevant to your project

The README provides:
- Clear installation instructions
- Project structure overview
- API documentation
- Technology stack information
- Contribution guidelines
- Contact information

You can enhance it further by adding:
- Deployment instructions
- Testing guidelines
- Environment variable explanations
- Demo link (if deployed)
