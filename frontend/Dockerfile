FROM node:20-bullseye-slim

WORKDIR /app

COPY ./package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]