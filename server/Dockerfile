FROM node:20.15.0

WORKDIR /server

COPY server/. .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]