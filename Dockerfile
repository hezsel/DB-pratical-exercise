FROM node:10.15.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 8000
CMD [ "nodemon", "src/index.js" ]
