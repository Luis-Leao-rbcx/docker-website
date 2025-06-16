FROM nginx:alpine

 # Install Git
 RUN apk add --no-cache git

 # Copy the website files to the Nginx HTML directory
 COPY . /usr/share/nginx/html
 EXPOSE 80
