# Prompt Bloom Studio

## Docker Setup

1. Ensure you have Docker and Docker Compose installed
2. Create a `.env` file in the `PromptCrafter-Docker` directory with:
   ```
   DOMAIN=localhost
   ```
3. Run the following commands:
   ```bash
   cd PromptCrafter-Docker
   docker-compose up -d
   ```
4. Access the application at http://localhost:8080

## Portainer Deployment

For one-click deployment in Portainer:

1. In Portainer, go to Stacks
2. Click "Add stack"
3. Name your stack (e.g. "prompt-bloom-studio")
4. Select "Repository" as the deployment method
5. Enter your GitHub repository URL
6. Set the path to `portainer-compose.yml`
7. Enable "Automatic updates" if desired
8. Click "Deploy the stack"

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
