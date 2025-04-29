#!/bin/sh

# Create directory for SSL certificates
mkdir -p /etc/nginx/ssl

# Generate self-signed certificate for localhost
# Create a temporary OpenSSL config file
cat > /tmp/openssl.cnf << EOF
[req]
distinguished_name=req
[v3_req]
subjectAltName=DNS:localhost,IP:127.0.0.1
EOF

# Generate certificate using the config file
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/nginx.key \
  -out /etc/nginx/ssl/nginx.crt \
  -subj "/CN=localhost" \
  -extensions v3_req \
  -config /tmp/openssl.cnf

# Remove temporary config file
rm -f /tmp/openssl.cnf

# Set proper permissions
chmod 600 /etc/nginx/ssl/nginx.key
chmod 644 /etc/nginx/ssl/nginx.crt

echo "Self-signed certificate for localhost has been generated."