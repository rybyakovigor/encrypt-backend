FROM node:16-alpine as builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn

COPY . ./
RUN yarn build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/
COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/

EXPOSE 3000
CMD ["yarn", "start:prod"]
