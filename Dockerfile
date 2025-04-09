FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_URL

# Создаем .env с правильным API URL
RUN echo "VITE_API_URL=${API_URL}" > .env.production

RUN npm run build

# Устанавливаем nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем результат сборки в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Базовая конфигурация nginx
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]