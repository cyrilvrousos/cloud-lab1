FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY wait-for-it.sh ./wait-for-it.sh

# Install app dependencies
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:migrate:prod" ]