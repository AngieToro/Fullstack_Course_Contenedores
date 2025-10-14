FROM node:22-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# ---------- test stage (fail-fast) ----------
FROM deps AS test
WORKDIR /usr/src/app
COPY . .
# define la URL del backend antes del build/pruebas si algo la usa
ENV VITE_BACKEND_URL=http://localhost:3000
# ejecutar pruebas de unidad del front
RUN npm run test:ci

# ---------- build stage ----------
FROM deps AS build
WORKDIR /usr/src/app
COPY . .
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm run build


# ---------- runtime stage (Nginx) ----------
FROM nginx:alpine AS runtime
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]