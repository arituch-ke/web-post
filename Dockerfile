FROM node:20-slim AS builder

WORKDIR /app
COPY . .
RUN yarn install --production --no-optional \
  && cp -r node_modules node_modules_prod \
  && yarn install \
  && yarn build \
  && rm -rf src test .husky .npmrc migrations seeders node_modules \
  && mv node_modules_prod node_modules

# ------- Final Image --------
FROM node:20-slim
ENV NODE_ENV production

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app .

CMD ["yarn", "start"]
