### STAGE 1: Build ###
FROM node:21.4-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/playground-webapp /usr/share/nginx/html