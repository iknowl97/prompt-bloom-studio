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
5. Enter your GitHub repository URL
6. Set the path to `portainer-compose.yml`
7. Set environment variables:
   - `GITHUB_USER`: Your GitHub username
   - `DOMAIN`: Your domain name
8. Click "Deploy the stack"

### Manual Production Deployment

```bash
# Pull the image
docker pull ghcr.io/YOUR_GITHUB_USER/prompt-bloom-studio:latest

# Create a network
docker network create prompt-network

# Run the container
docker run -d \
  --name prompt-bloom-studio \
  --restart unless-stopped \
  --network prompt-network \
  -p 8080:80 \
  -e DOMAIN=your-domain.com \
  -v ./nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  --health-cmd="wget -qO- http://localhost:80/ || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  --health-start-period=40s \
  --security-opt no-new-privileges:true \
  ghcr.io/YOUR_GITHUB_USER/prompt-bloom-studio:latest
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
