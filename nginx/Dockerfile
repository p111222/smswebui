FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx html folder
COPY ./dist /usr/share/nginx/html

#  nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./certificates/* /etc/nginx/certificates/

# Expose port 80
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]