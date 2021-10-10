FROM node:15.10.0

ENV NODE_ENV=production

RUN npm i ts-node typescript nodemon -g

ADD . /var/lambda

WORKDIR /var/lambda

COPY ./package.json .

RUN npm i

COPY . .

ARG SERVICE=all
RUN echo "Running container for ${SERVICE} service(s)"
ENV CONTAINER_SERVICE=${SERVICE}
CMD npm start -- --service=${CONTAINER_SERVICE}