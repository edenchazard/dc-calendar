FROM node:24.0-bookworm-slim AS base

ENV NODE_ENV=development

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json package-lock.json ./
RUN npm install

# Run
FROM base

COPY --from=build /src/node_modules /src/node_modules

CMD [ "npm", "run", "dev" ]
