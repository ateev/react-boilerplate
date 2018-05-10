FROM node:8.11.1

ARG BUILD_ENV

# Installing pm2
RUN npm i -g pm2 && \
  apt-get update && \
  apt-get install -y curl

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
COPY config/config.js.sample /app/config/config.js

# Build server side code
RUN npm run webpack-server-build > /dev/null
CMD npm run start
