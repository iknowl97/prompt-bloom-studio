# Prompt Bloom Studio Docker Configuration

## Overview

This directory contains the Docker configuration for Prompt Bloom Studio, following 2025 Docker standards for security, performance, and reliability.

## Recent Updates

### Permission Fixes for Non-Root Execution

The Docker configuration has been updated to fix permission issues when running Nginx as a non-root user:

1. **Custom Nginx Configuration**: Added a custom `nginx.conf` that removes the problematic `user` directive and configures temp paths appropriately for non-root execution

2. **Cache Directory Setup**: Explicitly creates and sets proper permissions for Nginx cache directories:

   ```
   /var/cache/nginx/client_temp
   /var/cache/nginx/proxy_temp
   /var/cache/nginx/fastcgi_temp
   /var/cache/nginx/uwsgi_temp
   /var/cache/nginx/scgi_temp
   ```

3. **Directory Permissions**: Sets appropriate permissions (1777) for cache directories to allow writing by the non-root user

4. **Ownership**: Changes ownership of critical directories to the non-privileged `appuser`

## Security Features

- Runs as non-root user (`appuser`)
- Uses read-only volumes where possible
- Implements the no-new-privileges security option
- Sets appropriate file permissions
- Uses Alpine-based images to reduce attack surface

## Usage

Refer to the main project README.md and DEPLOYMENT.md for complete usage instructions.
