# TodoTrack - Task Management with File Sharing

TodoTrack is a powerful task management application with built-in secure file sharing capabilities.

## Features

- Create and manage tasks with deadlines
- Attach files to tasks for easy sharing
- Set permissions and access controls for tasks
- Real-time file sharing
- Password protection
- Secure file management
- One-time view options

## Quick Start

### Using Docker (recommended)

The easiest way to run TodoTrack is using Docker:

```bash
docker run -d \
  --name todotrack \
  -p 8080:8080 \
  -v todotrack-data:/home/todotrack/server/files \
  ankitosm/todotrack:latest
```

Then access TodoTrack at http://localhost:8080

### Using Docker Compose

1. Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  todotrack:
    image: ankitosm/todotrack:latest
    container_name: todotrack
    ports:
      - "8080:8080"
    volumes:
      - todotrack-data:/home/todotrack/server/files
    restart: unless-stopped

volumes:
  todotrack-data:
```

2. Start the container:

```bash
docker-compose up -d
```

## Configuration

TodoTrack can be configured using environment variables. For example:

```bash
docker run -d \
  --name todotrack \
  -p 8080:8080 \
  -v todotrack-data:/home/todotrack/server/files \
  -e PLIKD_DEBUG=true \
  -e PLIKD_MAX_FILE_SIZE_STR="20GB" \
  ankitosm/todotrack:latest
```

## Building from Source

To build the Docker image yourself:

```bash
git clone https://github.com/yourusername/todotrack.git
cd todotrack
docker build -t yourusername/todotrack:latest .
```

## Deployment on DigitalOcean

1. Create a new Droplet with Docker pre-installed
2. SSH into your Droplet
3. Pull and run the TodoTrack image:

```bash
docker run -d \
  --name todotrack \
  -p 80:8080 \
  -v todotrack-data:/home/todotrack/server/files \
  ankitosm/todotrack:latest
```

4. Access TodoTrack at your Droplet's IP address

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, contact ankitosm on GitHub or Docker Hub. 