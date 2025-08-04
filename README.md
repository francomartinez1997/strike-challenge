# Strike Challenge

This repository contains a fullstack application composed of a **NestJS** backend, a **React** frontend, and a **PostgreSQL** database. The entire environment can be easily started using **Docker Compose**.

---

## Technologies

- Backend: NestJS (TypeScript)  
- Frontend: React + Vite  
- Database: PostgreSQL  
- Docker and Docker Compose  

---

## Requirements

- [Docker](https://docs.docker.com/get-docker/) (v20+)  
- [Docker Compose](https://docs.docker.com/compose/) (v2.20+)  

---

## Quick Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/strike-challenge.git
cd strike-challenge
```

2. Start all services with Docker Compose:
```bash
docker-compose up --build
```

3. Wait for the containers to start properly. Once ready:
- Frontend available at: http://localhost:5173
- Backend running at: http://localhost:3000
- PostgreSQL running on port 5432 with user postgres and password postgres

## How to test
- Access the frontend in your browser: http://localhost:5173
- Consume the backend API using Postman or Insomnia: http://localhost:3000