# Base
FROM node:16-alpine as base

WORKDIR /usr/src/app

# Dependencies
FROM base as dependencies

COPY package*.json ./

#RUN npm ci --only=production
RUN yarn

# Serve
FROM base as build

ENV NODE_ENV=production

COPY --from=dependencies /usr/src/app/node_modules ./node_modules

COPY . .

CMD [ "node", "index.js" ]
