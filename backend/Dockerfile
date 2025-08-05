FROM node:20-bullseye-slim

WORKDIR /app

COPY ./package*.json ./
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

EXPOSE 3000
