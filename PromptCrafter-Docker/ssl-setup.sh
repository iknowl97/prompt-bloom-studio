#!/bin/bash

# Create directory for SSL certificates
mkdir -p /etc/nginx/ssl

# Generate self-signed certificate for localhost
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/nginx.key \
  -out /etc/nginx/ssl/nginx.crt \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

# Set proper permissions
chmod 600 /etc/nginx/ssl/nginx.key
chmod 644 /etc/nginx/ssl/nginx.crt

echo "Self-signed certificate for localhost has been generated."