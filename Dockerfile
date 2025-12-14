
# 1. Install node modules

FROM node:24-alpine AS installer
WORKDIR /app

RUN corepack enable # enable pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

# 2. Build stage

FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable # enable pnpm

COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# 3. Production

FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV PORT=3000
EXPOSE 3000
CMD ["node", "build"]

# docker build -t ghcr.io/norwindijkman/chase:local .
# docker run --env-file .env -p 3000:3000 --network="host" ghcr.io/norwindijkman/chase:local
# docker push ghcr.io/norwindijkman/chase:local
