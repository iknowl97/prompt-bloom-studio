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
   1
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

The application will be available at `http://localhost:8080` after the build completes.

To check the container status:

```bash
docker ps
docker logs prompt-bloom-studio
```

````

## Monitoring

Check container health status:

```bash
docker inspect --format='{{.State.Health.Status}}' prompt-bloom-studio
````

## Troubleshooting

- **Container not starting**: Check logs with `docker logs prompt-bloom-studio`
- **Health check failing**: Verify nginx configuration and network settings
- **Environment variables**: Ensure all required variables are set correctly
