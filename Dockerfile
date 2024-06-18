FROM node:18.17.1-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 4321

CMD ["npm", "run", "dev"]