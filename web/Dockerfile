FROM node:16.13.2-alpine
RUN mkdir -p /usr/src/app
RUN apk add --no-cache bash
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000