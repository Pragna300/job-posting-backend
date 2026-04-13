# Job Platform Backend

Node.js + Express API for authentication, role-based job workflows, applications, resume upload, and interview integration.

## Tech Stack

- Node.js
- Express
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- File upload (`multer`, Cloudinary)
- Email notifications (`nodemailer`)
- AI/ATS utilities (OpenRouter + Hugging Face integrations in services)

## Folder Structure

- `config` - database and Cloudinary config
- `controllers` - request handlers
- `middleware` - auth, role checks, uploads
- `models` - data access layer
- `routes` - API route definitions
- `services` - ATS scoring, AI helpers, notifications
- `database/schema.sql` - SQL schema
- `run_migrations.js` / `create_ai_tables.js` - DB setup scripts
- `server.js` - app entrypoint

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- A Cloudinary account (for resume/media uploads)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in `backend/` with your own values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=job_platform
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

HF_API_KEY=your_hf_key
OPENROUTER_API_KEY=your_openrouter_key
```

3. Initialize database schema:

```bash
npm run migrate
node create_ai_tables.js
```

## Run

```bash
npm run dev
```

or production mode:

```bash
npm start
```

Server default: `http://localhost:5000`

## API Route Groups

- `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- `GET /admin/stats`, `GET /admin/users`, `GET /admin/companies`, `GET /admin/jobs`
- `GET /company/profile`, `PUT /company/profile`, `GET /company/jobs`
- `GET /jobs`, `GET /jobs/:id`, `POST /jobs`, `PUT /jobs/:id`
- `POST /applications`, `GET /applications/my`, `GET /applications/job/:id`
- `POST /api/resume/upload`
- `GET /api/interviews/validate`, `POST /api/interviews/submit` (legacy), `POST /api/interviews/submit-ai`
- Panel (compatible with [AI-Interview-Panel-Backend](https://github.com/khaleel-shnoor/AI-Interview-Panel-Backend)): `POST /api/interview/verify-user`, `GET /api/interview/questions/:token`, `POST /api/interview/submit`, `GET /api/interview/result/:token`

Route definitions are available in the `routes/` folder and controller logic is in `controllers/`.

## Roles

- `admin` - platform-level management
- `manager` - company/job management
- `client` - job seeker actions

Route protection is enforced via `auth.middleware.js` and `role.middleware.js`.

## Notes

- Do not commit `.env` with real credentials.
- Ensure frontend `VITE_API_BASE_URL` points to this backend URL.
