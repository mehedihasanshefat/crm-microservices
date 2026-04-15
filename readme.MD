# COMMON ::

FROM node:18

WORKDIR /app
COPY package\*.json ./
RUN npm install

COPY . .

CMD ["npm","run","dev"]

# FOR API-GATEWAY ::

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf

# Script

"dev": "nodemon src/server.js"

# AUTH SERVICE ::

PORT=5001
MONGO_URI=mongodb://mongo-auth:27017/authdb
REDIS_URL=redis://redis:6379
KAFKA_BROKER=kafka:9092

#
