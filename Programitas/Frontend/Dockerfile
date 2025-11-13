# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔧 Agregar variables de entorno en el build
ARG VITE_BACKEND_URL
ARG VITE_NOTIFICATION_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_NOTIFICATION_URL=$VITE_NOTIFICATION_URL

RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
