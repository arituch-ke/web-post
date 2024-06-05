FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN yarn install

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN yarn build

# Production stage
FROM node:20-alpine AS production
ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["yarn", "start"]
