# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm ci && npm cache clean --force

# Copy all files
COPY . ./

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set proper permissions
RUN mkdir -p /usr/share/nginx/html && \
  chown -R appuser:appgroup /usr/share/nginx/html

# Copy built files from build stage to nginx serve directory
COPY --from=build --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY PromptCrafter-Docker/nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Security: Drop capabilities and run as non-root
RUN chmod -R 755 /usr/share/nginx/html && \
  chmod -R 755 /var/cache/nginx && \
  chmod -R 755 /var/log/nginx && \
  chmod -R 755 /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Set user
USER appuser

# Start nginx
CMD ["nginx", "-g", "daemon off;"]