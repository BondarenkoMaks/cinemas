FROM node:6.11.0

RUN mkdir /cinemas

COPY package.json /cinemas

WORKDIR /cinemas

RUN npm install

COPY . /cinemas

EXPOSE 3000

CMD ["node", "server.js"]