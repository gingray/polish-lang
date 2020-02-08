FROM nginx:stable-alpine
RUN mkdir app/
COPY ./build app
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf