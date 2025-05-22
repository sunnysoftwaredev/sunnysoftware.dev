# SunnySoftware.dev

[![Build Status](https://github.com/sunnysoftwaredev/sunnysoftware.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/sunnysoftwaredev/sunnysoftware.dev/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/sunnysoftwaredev/sunnysoftware.dev)](https://codecov.io/gh/sunnysoftwaredev/sunnysoftware.dev)
[![License](https://img.shields.io/badge/license-Unlicense-blue.svg)](LICENSE)

The website of Sunny Software, LLC (https://sunnysoftware.dev)

## Features

- User authentication (register, login, logout, password reset)
- Project and contacts management
- Time tracking and work logs (daily and weekly)
- RESTful API with TypeScript and Express
- React front-end with Redux for state management

## Installation

Install the project's dependencies:

```bash
npm install
```

## Usage

### Development

Start the development environment with hot-reloading:

```bash
npm run dev
```

### Production

Build the project and start the server:

```bash
npm run build
npm start
```

### Linting

Check code style and quality:

```bash
npm run lint
```

## Usage Examples

Fetching a list of projects:

```bash
curl --request GET http://localhost:3000/api/projects
```

Creating a new user:

```bash
curl --request POST http://localhost:3000/api/register \
  --header 'Content-Type: application/json' \
  --data '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

## API Endpoints

| Method | Endpoint               | Description                               | Parameters                     |
| ------ | ---------------------- | ----------------------------------------- | ------------------------------ |
| POST   | /api/register          | Register a new user                       | name, email, password (JSON)   |
| POST   | /api/login             | Login and retrieve auth token             | email, password (JSON)         |
| POST   | /api/logout            | Invalidate current auth session           | Auth cookie                    |
| GET    | /api/authenticate      | Check authentication status               | Auth cookie                    |
| GET    | /api/projects          | Retrieve list of projects                 | Auth cookie                    |
| GET    | /api/projects/:id      | Retrieve a single project by ID           | id in URL                      |
| GET    | /api/contacts          | Retrieve contacts list                    | Auth cookie                    |
| GET    | /api/timesheets        | Retrieve timesheets                       | Auth cookie                    |
| POST   | /api/forgotPassword    | Send forgot password email                | email (JSON)                   |
| GET    | /api/users             | Retrieve list of users                    | Auth cookie                    |
| GET    | /api/users/:id         | Retrieve user details by ID               | id in URL                      |
| GET    | /api/workLogs          | Retrieve work logs                        | Auth cookie                    |
| GET    | /api/weeklyWorkLogs    | Retrieve weekly work logs                 | Auth cookie                    |

Example request:

```bash
curl --request GET http://localhost:3000/api/users/1
```

## Contributing

We welcome contributions to SunnySoftware.dev! Please follow these guidelines:

1. Fork the repository and create a feature branch: `git checkout -b yourname/feature-name`.
2. Commit changes with clear, semantic messages (e.g., `feat: add new API endpoint`).
3. Open a pull request against the `main` branch and describe your changes.
4. Ensure code passes linting: `npm run lint`.
5. (Optional) Add tests to cover new functionality.

Thank you for helping improve our project!

## License

This project is licensed under the [Unlicense](LICENSE).
