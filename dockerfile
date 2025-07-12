# Stage 1: Build
FROM oven/bun:1.1.7 AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY prisma ./prisma
COPY tsconfig*.json ./

RUN bunx prisma generate

COPY . .
RUN bun run build

# Stage 2: Production
FROM node:24.4.0-alpine3.22 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/index.js"]
