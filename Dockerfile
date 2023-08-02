# pull the base image
FROM node:alpine as build

# set the working direction
WORKDIR /app
COPY . ./

# install app dependencies
RUN npm ci
RUN npm run build


FROM nginx:stable-alpine as webserver
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# start app
CMD ["nginx", "-g", "daemon off;"]