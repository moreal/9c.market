FROM node:22 AS builder

WORKDIR /app

RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable

COPY . .

RUN yarn build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]
