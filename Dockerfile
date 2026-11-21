FROM node:26.13.1-trixie-slim

ENV NODE_ENV=development

WORKDIR /src

COPY --link package.json package-lock.json ./
RUN npm ci && \
    npx playwright install --with-deps

CMD ["npm", "run", "dev"]
