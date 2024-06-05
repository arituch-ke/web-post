FROM node:20-slim AS builder

WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn build

# ------- Final Image --------
FROM node:20-slim
ENV NODE_ENV production

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app .

CMD ["yarn", "start"]
