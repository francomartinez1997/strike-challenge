FROM node:20-bullseye-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

EXPOSE 3000

# COPY entrypoint.sh /app/entrypoint.sh

# RUN chmod +x /app/entrypoint.sh

# CMD ["/app/entrypoint.sh"]
