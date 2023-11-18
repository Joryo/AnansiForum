# Anansi Forum

## Project Overview: Full-Stack Web Application Training
This public repository is part of my personal development journey to build a complete full-stack web application using modern technologies. The goal is to master advanced concepts and workflows in full-stack development while demonstrating proficiency across a variety of tools and frameworks.

Technologies Used:
- **Turborepo**: Managing monorepos with streamlined builds and deployments.
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **NextUI**: A modern UI library for building user interfaces in Next.js.
- **Prisma**: Type-safe database client for SQLLite and other databases.
- **TypeScript**: Strongly typed programming for increased reliability and scalability.
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.
- **Zod**: Schema declaration and validation library for TypeScript.
- **NestJS**: Progressive Node.js framework for building efficient, scalable server-side applications.

## Purpose
This repository showcases my ability to integrate diverse technologies into a cohesive full-stack solution. The aim is to develop a scalable, maintainable web application while exploring best practices in modern web development.

## Core Implementations
- **JWT Authentication**: Implemented secure and scalable user sessions using JSON Web Tokens, following modern authentication standards.
- **REST API Principles**: Designed the backend around REST principles to ensure clean, consistent communication between the client and server.
- **Search Engine on SQLite**: Utilized SQLite for the search functionality, providing efficient data retrieval while keeping the setup lightweight and suitable for prototyping.
- **Code Clarity with ESLint**: Integrated ESLint to enforce coding standards, maintain code clarity, and prevent common errors during development.
- **Swagger Documentation**: Implemented Swagger for automatic API documentation, offering a comprehensive and interactive way to explore and test API endpoints.
## Testing locally
### With docker
Prerequisites:
- have docker installed and running

Build docker images:
```bash
docker-compose build
```

Run docker containers:
```bash
docker-compose up -d
```

Got to http://localhost:3000 to see the app.

### Without docker
Prerequisites:
- have node installed version 20 or higher
- have pnpm installed

Generate prisma client:
 - in apps/api:
```bash
npx prisma generate
```

Confiruge env variables:
 - in apps/api:
```bash
cp .env.sample .env
```
 - Replace the values in .env by your own

Launch the app via pnpm and turbo:
```bash
pnpm install
pnpm dev
```
