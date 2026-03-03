FROM node:lts-alpine
WORKDIR /app
ARG PROJECT_DIR

COPY ./${PROJECT_DIR}/package*.json ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]