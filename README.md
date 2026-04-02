# Job Platform

A full-stack job posting platform with three user roles: Admin, Manager, and Client.

## Project Structure

```
job-platform/
├── frontend/     # React application
├── backend/      # Node.js API
└── README.md
```

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MySQL
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js (v16+)
- MySQL
- Git

### Backend Setup

1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Configure environment variables in `backend/.env`
4. Set up database: Run the SQL schema in `backend/database/schema.sql`
5. Start server: `npm run dev`

### Frontend Setup

1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Configure API URL in `frontend/.env`
4. Start development server: `npm start`

## Features

### Admin Panel

- Company management and approval
- Revenue tracking
- Platform oversight

### Manager Panel

- Company profile management
- Job posting and editing
- Applicant management

### Client Panel

- Job browsing and application
- Profile management
- Application tracking

## API Documentation

See `backend/README.md` for detailed API endpoints.
