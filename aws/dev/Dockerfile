FROM node:10.14.2-stretch

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["npm", "run", "start"]
