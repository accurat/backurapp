FROM node:10

RUN mkdir /app
WORKDIR /app
RUN npm install -g yarn
COPY ./package.json /app/.
COPY ./.env /app/src/.
COPY ./src /app/src/.
RUN yarn install
EXPOSE 4000
RUN ls /app

CMD ["node", "/app/src/index.js"]
