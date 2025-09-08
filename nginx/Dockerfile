# Step 1: Build React App
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
COPY icons-material-5.16.7.tgz ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .


# Add ENV
ARG VITE_ENCRYPTION_KEY
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_URL
ARG VITE_BASE_URL
ARG VITE_CONTEXT_PATH

#set env for vite build
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL \
    VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM \
    VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID \
    VITE_BASE_URL=$VITE_BASE_URL \
    VITE_CONTEXT_PATH=$VITE_CONTEXT_PATH \
    VITE_ENCRYPTION_KEY=$VITE_ENCRYPTION_KEY


RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Step 2: Serve using NGINX
FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

#  nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./certificates/* /etc/nginx/certificates/

# Expose port 80
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]