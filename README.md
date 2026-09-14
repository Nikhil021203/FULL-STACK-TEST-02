# Full-Stack Test Drive

A minimal functional project demonstrating: Next.js + React + TypeScript frontend,
Spring Boot + Spring Data JPA + Hibernate + PostgreSQL backend, secured with
Spring Security, Dockerized and Render-ready.

## Stack
Java, Spring Boot, REST API, TypeScript, React, Next.js, HTML, CSS,
PostgreSQL, Spring Data JPA + Hibernate, Spring Security, Docker, Render.

## Structure
```
frontend/   Next.js dashboard (status, CRUD, auth, protected call)
backend/    Spring Boot REST API + JPA/Hibernate + Security
render.yaml Render deployment config
```

## Prerequisites
- Node.js 20+
- Java 17+ and Maven
- PostgreSQL running locally (or use Docker)

## Environment Variables

Backend:
- `DATABASE_URL` (e.g. `jdbc:postgresql://localhost:5432/testdb`)
- `DB_USER`
- `DB_PASSWORD`
- `FRONTEND_URL` (CORS origin, default `http://localhost:3000`)
- `PORT` (default `8080`)

Frontend:
- `NEXT_PUBLIC_API_URL` (backend base URL, default `http://localhost:8080`)

Demo login: username `demo`, password `demo`.

## Run Locally

Backend:
```
cd backend
mvn spring-boot:run
```

Frontend:
```
cd frontend
npm install
npm run dev
```

## REST Endpoints
```
GET    /api/status
GET    /api/items
POST   /api/items
PUT    /api/items/{id}
DELETE /api/items/{id}
GET    /api/protected   (requires HTTP Basic auth)
```

## Docker

Build and run each service:
```
docker build -t backend ./backend
docker run -p 8080:8080 --env DATABASE_URL=... backend

docker build -t frontend ./frontend
docker run -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://localhost:8080 frontend
```

## Deploy to Render

1. Push this repo to GitHub.
2. In Render, create a new Blueprint from the repo (uses `render.yaml`).
3. Render provisions the PostgreSQL database and both Docker services automatically.
4. Update `FRONTEND_URL` / `NEXT_PUBLIC_API_URL` in `render.yaml` if service names differ.

## Technology Flow
```
Next.js -> React/TypeScript -> REST -> Spring Boot -> Spring Data JPA -> Hibernate -> PostgreSQL
Login -> Spring Security -> Authenticated Request -> Protected REST Endpoint
```
