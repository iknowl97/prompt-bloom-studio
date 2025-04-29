# Prompt Bloom Studio

An AI-powered prompt engineering platform that helps you create and optimize prompts for various AI models. Built with modern technologies and a beautiful UI, it's designed to make prompt engineering accessible and efficient.

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/iknowl97/prompt-bloom-studio.git
cd prompt-bloom-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🐳 Docker Deployment

```bash
# Clone and enter the repository
git clone https://github.com/iknowl97/prompt-bloom-studio.git
cd prompt-bloom-studio

# Build and start the container
docker-compose up -d --build
```

The application will be available at `http://localhost:8080`

### 🔍 Troubleshooting

- **Build fails**: Make sure you have Node.js 18+ installed
- **Container not starting**: Check logs with `docker logs prompt-bloom-studio`
- **Cannot access app**: Verify port 8080 is not in use
- **UI not loading**: Clear browser cache and reload

## ⚙️ Environment Variables

- `DOMAIN`: Your domain or IP address (default: localhost)
- `NODE_ENV`: Environment mode (development/production)

## 🌟 Features

- Create powerful AI prompts from simple descriptions
- Enhance and optimize existing prompts
- Purpose-specific templates for different AI models
- Modern, intuitive interface with dark mode support
- Save and organize your prompts
- Export in multiple formats (JSON, MD, XML)

## 📝 License

MIT License - feel free to use and modify!

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
4. Access the application at:
   - HTTP: http://localhost:7777
   - HTTPS: https://localhost:7778
5. Check container health status:

   ```bash
   docker ps
   docker inspect --format='{{.State.Health.Status}}' prompt-bloom-studio
   ```

   Note: When accessing via HTTPS, your browser may show a security warning because the certificate is self-signed. This is normal for local development. You can proceed by clicking "Advanced" and then "Proceed to localhost (unsafe)".

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
