FROM node:20 as build-stage
ENV NODE_ENV="production"
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
