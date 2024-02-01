FROM node:20 as build-stage
WORKDIR /app
COPY . .
RUN npm i -g npm
RUN npm i --legacy-peer-deps
RUN npm run build

FROM nginx:alpine
ARG FRONTEND_PORT="80"
ARG NODE_ENV="production"
ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV NODE_ENV=${NODE_ENV}
ENV ENV=${NODE_ENV}
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE ${FRONTEND_PORT}
CMD ["nginx", "-g", "daemon off;"] 
