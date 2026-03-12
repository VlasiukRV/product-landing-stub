# --- BASE ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- DEVELOPMENT ---
FROM base AS dev
ENV NODE_ENV=development

# --- PROD BUILDER  ---
FROM base AS builder
RUN mkdir -p /app/public_html
RUN npm run build:all

# --- PRODUCTION (Nginx) ---
FROM nginx:alpine AS prod

COPY --from=builder /app/public_html /usr/share/nginx/html
COPY nginx/ /etc/nginx/conf.d/

EXPOSE 8091-8098