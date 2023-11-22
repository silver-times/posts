# ReactPosts

### Description:

ReactPosts is a Fullstack blog application with CRUD operations. The frontend is built with React and the backend is built with Node and Express. The database is Postgres and the ORM is Prisma. The frontend is styled with TailwindCSS and DaisyUI and the entire application is written in Typescript.

### Functionality:

- Authorization and token update
- Ability to view all posts
- Ability to view posts of a specific user
- Ability to view a single post on its own page
- Ability to search for posts by title or content
- Create, read, update and delete posts for authorized users
- Toast notifications for Login, Signup, Signout, errors and CRUD operations
- Seed data to populate the database

## Installation

Simply clone it and run the following command:

```bash
  cd posts && cat backend/.env.local > backend/.env && pnpm start
```

## Tech Stack

**Frontend:**

- React
- Typescript
- React Toastify
- React Router DOM
- Context API
- TailwindCSS
- DaisyUI

**Backend:**

- Node
- Express
- Prisma
- Bcrypt
- Typescript
- Jsonwebtoken
- Docker and Docker compose
- CORS
