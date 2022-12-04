FROM node:alpine

WORKDIR /app

COPY ./package.json .
RUN npm install --omit=dev
COPY ./src ./src
COPY ./.env ./.env
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

CMD ["npm", "run", "start:prod"]
