# Prompt Bloom Studio

## Docker Setup

1. Ensure you have Docker and Docker Compose installed
2. Copy the `.env.example` file to `.env` and update the values as needed:
   ```bash
   cp .env.example .env
   # Edit .env with your preferred editor
   ```
3. Run the following commands:
   ```bash
   cd PromptCrafter-Docker
   docker-compose up -d
   ```
4. Access the application at http://localhost:8080
5. Check container health status:
   ```bash
   docker ps
   docker inspect --format='{{.State.Health.Status}}' prompt-bloom-studio
   ```

## Portainer Deployment (2025 Standards Compliant)

For one-click deployment in Portainer:

1. In Portainer, go to Stacks
2. Click "Add stack"
3. Name your stack (e.g. "prompt-bloom-studio")
4. Select "Repository" as the deployment method
5. Enter your GitHub repository URL
6. Set the path to `portainer-compose.yml`
7. Enable "Automatic updates" if desired
8. Set environment variables:
   - `GITHUB_USER`: Your GitHub username
   - `DOMAIN`: Your domain name or IP address
9. Click "Deploy the stack"

The deployment includes:

- Health checks for automatic monitoring
- Resource limits for optimal performance
- Security enhancements (read-only volumes, no-new-privileges)
- Non-root user execution in container

## Publishing

To publish your container:

1. Build the image:
   ```bash
   docker-compose build
   ```
2. Tag and push to your container registry:
   ```bash
   docker tag prompt-bloom-studio your-registry/prompt-bloom-studio:latest
   docker push your-registry/prompt-bloom-studio:latest
   ```

## Environment Variables

- `DOMAIN`: The domain where your application will be hosted (default: localhost)
- `GITHUB_USER`: Your GitHub username (required for Portainer deployment)

### Optional Variables

The following variables are commented out by default in `.env.example` but can be uncommented if needed:

- `DB_HOST`: Database host (if using a database)
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password

All environment variables are properly handled with secure defaults and validation in the application.
