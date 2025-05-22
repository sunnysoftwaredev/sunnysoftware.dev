# SunnySoftware.dev

[![Build Status](https://github.com/sunnysoftwaredev/sunnysoftware.dev/actions/workflows/build.yml/badge.svg)](https://github.com/sunnysoftwaredev/sunnysoftware.dev/actions/workflows/build.yml) [![Coverage Status](https://codecov.io/gh/sunnysoftwaredev/sunnysoftware.dev/branch/main/graph/badge.svg)](https://codecov.io/gh/sunnysoftwaredev/sunnysoftware.dev) [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](LICENSE)

The official website and API for Sunny Software, LLC. Visit our site at [https://sunnysoftware.dev](https://sunnysoftware.dev).

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Development Server](#development-server)
  - [Production Build & Server](#production-build--server)
- [Development](#development)
- [API](#api)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Projects](#projects)
  - [Work Logs](#work-logs)
  - [Contacts & Timesheets](#contacts--timesheets)
- [Contributing](#contributing)
- [License](#license)

## Features
- Modern tech stack: Node.js, Express, TypeScript, Webpack, React
- Cookie-based authentication with secure tokens
- User, project, work log, and timesheet management
- RESTful API endpoints with JSON responses
- Linting and code quality checks via ESLint
- Continuous integration and coverage reporting

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sunnysoftwaredev/sunnysoftware.dev.git
cd sunnysoftware.dev
npm install
```

## Usage

### Development Server

Start the development environment with live-reload for client and server:

```bash
npm run dev
```

- Client served on [http://localhost:8080](http://localhost:8080)
- Server API on [http://localhost:3000/api](http://localhost:3000/api)

### Production Build & Server

Build assets and start the production server:

```bash
npm run build
npm start
```

## Development

- **Linting:** `npm run lint` (add `--fix` to auto-correct)
- **Type Checking:** Handled by `ts-loader` in Webpack
- **Watching:** 
  - `npm run watch:webpack` (client)
  - `npm run watch:server` (server)

## API

All endpoints are prefixed with `/api`. Responses use JSON and include a `success` flag.

### Authentication

#### POST /api/register
Register a new user.

Request Body:
```json
{
  "username": "jdoe",
  "email": "jdoe@example.com",
  "password": "StrongP@ssw0rd"
}
```

#### POST /api/login
Log in an existing user.

Request Body:
```json
{
  "email": "jdoe@example.com",
  "password": "StrongP@ssw0rd"
}
```

Response Sets a secure HTTP-only cookie `authenticationToken` on success.

#### GET /api/authenticate
Validate the current session token. Returns user ID if valid.

### Users

#### GET /api/users
Retrieve all users. Requires valid session cookie.

#### POST /api/users
Update a user's profile.

Request Body:
```json
{
  "id": 42,
  "newUsername": "janed",
  "newEmail": "janed@example.com",
  "newRole": "admin"
}
```

#### POST /api/users/deactivate
Deactivate a user by ID.

Request Body:
```json
{ "id": 42 }
```

#### POST /api/users/password
Update the current user's password.

Request Body:
```json
{ "password": "NewStrongP@ss" }
```

### Projects

#### GET /api/projects
List all client projects.

#### POST /api/projects
Create a new project.

Request Body:
```json
{
  "client": "42",
  "title": "New Website",
  "description": "Build a marketing site"
}
```

#### PUT /api/projects
Update an existing project.

Request Body:
```json
{
  "id": 101,
  "newTitle": "Updated Title",
  "newDescription": "Revised desc",
  "newActive": true
}
```

### Work Logs

#### GET /api/workLogs
Fetch all work log entries for the authenticated user.

#### POST /api/workLogs
Submit a new work log entry.

Request Body Example:
```json
{
  "projectId": 101,
  "hours": 3.5,
  "notes": "Design meeting"
}
```

#### GET /api/weeklyWorkLogs
Fetch aggregated work hours by week.

### Contacts & Timesheets

Use `/api/contacts` and `/api/timesheets` for client contacts and billing timesheets. Refer to inline API documentation for payload details.

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork & Branch**: Fork the repo, create a branch named `feature/your-feature` or `fix/issue-description`.
2. **Code Style**: Use ESLint rules (`npm run lint`). Maintain existing formatting and conventions.
3. **Commits**: Write semantic commit messages (e.g., `feat: add login endpoint`, `fix: correct typo in README`).
4. **Pull Requests**: Submit a PR to `main`. Include a clear description and reference any relevant issue (e.g., `resolves #123`).
5. **Testing**: Ensure new code is covered by tests where applicable. Run linter before pushing.

## License

This project is licensed under the [Unlicense](LICENSE). Enjoy the freedom to use, share, and modify!