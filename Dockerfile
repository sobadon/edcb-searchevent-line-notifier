FROM node:14.11.0-alpine AS build

WORKDIR /app

COPY . ./
RUN yarn
RUN yarn build

FROM node:14.11.0-alpine AS start

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

CMD yarn start
