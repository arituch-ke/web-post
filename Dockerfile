FROM node:20-slim AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .

FROM node:20-slim
ENV NODE_ENV production

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app .

CMD ["yarn", "start"]
