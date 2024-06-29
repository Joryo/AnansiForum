FROM node:20-alpine AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune anansi-forum-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn prisma generate


FROM node:20-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=api --include-dependencies --no-deps

FROM node:20-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "node", "apps/api/dist/main.js" ]