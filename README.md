# Strike Challenge

Este repositorio contiene una aplicación fullstack compuesta por un backend en **NestJS**, un frontend en **React**, y una base de datos **PostgreSQL**. Todo el entorno se puede levantar fácilmente con **Docker Compose**.

---

## Tecnologías

- Backend: NestJS (TypeScript)
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Docker y Docker Compose

---

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/) (v2.20+)

---

## Instalación rápida

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/strike-challenge.git
cd strike-challenge
```

2. Levantar todos los servicios con Docker Compose
```bash
docker-compose up --build
```
3. Esperar que los contenedores inicien correctamente. Al terminar:
- Frontend disponible en: http://localhost:5173
- Backend correrá en: http://localhost:3000
- PostgreSQL correrá en el puerto 5432 con usuario postgres y contraseña postgres


## Estructura del proyecto

strike-challenge/
├── backend/         # API NestJS con Dockerfile y código fuente
├── frontend/        # App React + Vite con Dockerfile y código fuente
├── docker-compose.yml
└── README.md


# Cómo probar
- Acceder al frontend en el navegador: http://localhost:5173
- Consumir la API backend con Postman o Insomnia: http://localhost:3000