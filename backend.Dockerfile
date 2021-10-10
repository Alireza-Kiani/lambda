FROM node:15.10.0

ENV NODE_ENV=production

RUN npm i ts-node typescript nodemon -g

ADD . /var/lambda

WORKDIR /var/lambda

COPY ./package.json .

RUN npm i

COPY . .

CMD npm start