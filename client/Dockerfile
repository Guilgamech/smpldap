# Base
FROM node:16-alpine as base

WORKDIR /usr/src/app

# Dependencies
FROM base as dependencies

COPY package*.json ./

RUN yarn

# Build
FROM base AS build

ARG NODE_ENV=production

COPY --from=dependencies /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

# Serve
FROM nginx:1.21-alpine as serve

COPY nginx/default.conf.template /etc/nginx/templates/
COPY nginx/100-envsubst-on-javascripts.sh /docker-entrypoint.d/100-envsubst-on-javascripts.sh

COPY --from=build /usr/src/app/build /usr/share/nginx/html
