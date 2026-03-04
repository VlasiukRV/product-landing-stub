FROM node:lts-alpine
WORKDIR /app
ARG PROJECT_DIR

COPY ./${PROJECT_DIR}/package*.json ./
RUN npm install

COPY . .

EXPOSE 4323

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4323"]