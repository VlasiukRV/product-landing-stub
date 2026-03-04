FROM node:lts-alpine AS build
WORKDIR /app
ARG PROJECT_DIR

COPY ./${PROJECT_DIR}/package*.json ./
RUN npm install

COPY ./${PROJECT_DIR}/ ./
CMD npm run build && echo "Build successful, files are in /app/dist"