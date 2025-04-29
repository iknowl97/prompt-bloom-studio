
# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm ci && npm cache clean --force

# Set environment variables for build
ARG VITE_OPENROUTER_API_KEY
ARG VITE_DEFAULT_MODEL
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY
ENV VITE_DEFAULT_MODEL=$VITE_DEFAULT_MODEL

# Copy all files
COPY . ./

# Build the app with environment variables
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Install OpenSSL for certificate generation
RUN apk add --no-cache openssl

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set proper permissions
RUN mkdir -p /usr/share/nginx/html && \
  chown -R appuser:appgroup /usr/share/nginx/html

# Copy built files from build stage to nginx serve directory
COPY --from=build --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Copy custom nginx config and SSL setup script
COPY PromptCrafter-Docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY PromptCrafter-Docker/custom-nginx.conf /etc/nginx/nginx.conf
COPY PromptCrafter-Docker/ssl-setup.sh /tmp/ssl-setup.sh

# Make SSL setup script executable and run it
RUN mkdir -p /etc/nginx/ssl && \
  chmod +x /tmp/ssl-setup.sh && \
  sh /tmp/ssl-setup.sh && \
  chown -R appuser:appgroup /etc/nginx/ssl

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Security: Create necessary directories and set proper permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp /var/cache/nginx/scgi_temp && \
  chmod -R 755 /usr/share/nginx/html && \
  chmod -R 1777 /var/cache/nginx && \
  chmod -R 755 /var/log/nginx && \
  chmod -R 755 /etc/nginx/conf.d && \
  chown -R appuser:appgroup /var/cache/nginx /var/log/nginx /var/run

# Expose port 80
EXPOSE 80

# Set user
USER appuser

# Start nginx with custom configuration for non-root user
CMD ["nginx", "-g", "daemon off;"]
