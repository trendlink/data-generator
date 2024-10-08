FROM node:18-alpine

EXPOSE 3000 4173

WORKDIR /data-generator

COPY . /data-generator

COPY package.json .

RUN npm install

RUN npm run build

COPY . .

CMD ["npm", "run", "preview"]