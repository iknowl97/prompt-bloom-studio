
# Prompt Bloom Studio

An AI-powered prompt engineering platform that helps users create optimized prompts for various AI models.

## Features

- **Create from Scratch**: Generate powerful AI prompts from simple descriptions
- **Enhance Existing**: Improve and optimize your existing AI prompts
- **Purpose-Specific**: Tailor prompts for chat models, image generation, video creation, and more
- **Model Recommendations**: Get intelligent suggestions for the best AI model to use
- **Authentication**: Save prompts to your personal gallery
- **Export Options**: Download prompts in JSON, Markdown, or XML formats
- **Modern UI**: Clean, intuitive interface with pastel color scheme
- **Docker Ready**: Easy deployment with Docker and Portainer

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

## Usage Guide

### Creating Prompts

1. Select between "Create from Scratch" or "Enhance Existing" prompt mode
2. For new prompts, choose the intended purpose (chat, image, video, etc.)
3. Enter your prompt idea or existing prompt text
4. Click "Generate Prompt" or "Enhance Prompt"
5. Review your generated prompt
6. Copy, save, or download the result

### Account Management

- Guest users can generate prompts without logging in
- Create an account to save prompts to your personal gallery
- Access your saved prompts from the Gallery page
- Organize prompts with folders and tags

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
