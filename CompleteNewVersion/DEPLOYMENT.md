# Deployment Guide (2025 Standards)

This document outlines the deployment options and 2025 standards compliance for Prompt Bloom Studio.

## 2025 Docker Standards Compliance

The project has been updated to meet 2025 Docker deployment standards:

### Security Enhancements

- **Non-root User Execution**: Containers run as a non-privileged user (`appuser`)
- **Read-only Volumes**: Configuration files are mounted as read-only
- **No New Privileges**: Prevents privilege escalation within containers
- **Minimal Base Images**: Using Alpine-based images to reduce attack surface
- **Proper File Permissions**: All files have appropriate permissions set

### Performance Optimization

- **Resource Limits**: CPU and memory limits prevent resource exhaustion
- **Resource Reservations**: Guaranteed resources for stable performance
- **Multi-stage Builds**: Smaller final images with only production dependencies
- **Cache Optimization**: Proper layer ordering for efficient builds

### Reliability Features

- **Health Checks**: Automatic monitoring of container health
- **Restart Policies**: Containers automatically restart on failure
- **Graceful Shutdown**: Proper signal handling for clean termination

### Environment Configuration

- **Environment Variables**: Well-documented with `.env.example`
- **Secrets Management**: Sensitive data handled securely
- **Configuration Validation**: Environment variables validated at startup

## Deployment Options

### Local Development

```bash
cp .env.example .env
# Edit .env with your values
cd PromptCrafter-Docker
docker-compose up -d
```

### Portainer One-Click Deployment

1. In Portainer, go to Stacks
2. Click "Add stack"
3. Name your stack (e.g. "prompt-bloom-studio")
4. Select "Repository" as the deployment method
5. Enter your GitHub repository URL: `https://github.com/iknowl97/prompt-bloom-studio.git`
6. Set the path to `portainer-compose.yml`
7. Set environment variables:
   - `DOMAIN`: Your domain name or IP address
8. Click "Deploy the stack"

Note: The stack will build the Docker image locally instead of pulling from a registry.

### Local Build and Deployment

```bash
# Clone the repository
git clone https://github.com/iknowl97/prompt-bloom-studio.git
cd prompt-bloom-studio

# Create a network
docker network create prompt-network

# Build and run using docker-compose
docker-compose -f portainer-compose.yml up -d --build
```

The application will be available at:

- HTTP: `http://localhost:7777`
- HTTPS: `https://localhost:7778`

Note: When accessing via HTTPS, your browser may show a security warning because the certificate is self-signed. This is normal for local development. You can proceed by clicking "Advanced" and then "Proceed to localhost (unsafe)".

To check the container status:

```bash
docker ps
docker logs prompt-bloom-studio
```

## Monitoring

Check container health status:

```bash
docker inspect --format='{{.State.Health.Status}}' prompt-bloom-studio
```

## Troubleshooting

- **Container not starting**: Check logs with `docker logs prompt-bloom-studio`
- **Health check failing**: Verify nginx configuration and network settings
- **Environment variables**: Ensure all required variables are set correctly
- **Permission denied errors**: If you see errors like `mkdir() "/var/cache/nginx/client_temp" failed (13: Permission denied)`, ensure you're using the latest Docker configuration which fixes these permission issues by properly setting up cache directories and permissions for the non-root user
- **403 Forbidden errors**: This typically occurs when the volume mount in docker-compose.yml or portainer-compose.yml is overriding the built files. Make sure you're not mounting an empty ./dist directory to /usr/share/nginx/html
- **Authentication issues**: If you're having trouble with user authentication, check browser console logs and make sure localStorage is enabled
- **Prompt generation errors**: Verify the OpenRouter API key is correctly configured in your `.env` file

## Production Hardening Tips

For production environments, consider these additional security measures:

1. **Setup SSL/TLS**: Configure HTTPS with Let's Encrypt certificates
2. **Network Isolation**: Use dedicated Docker networks with restricted access
3. **Regular Updates**: Set up automated security scans and updates
4. **Backup Strategy**: Implement regular backups of user data and prompts
5. **Monitoring**: Add logging and monitoring solutions like Prometheus/Grafana
