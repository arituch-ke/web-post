# Frontend Setup Guide
## Live Demo

[Live Demo Link](https://web-post.anoncheck.uk)

This guide provides step-by-step instructions on how to set up and run the Frontend locally using Yarn and within a Docker container using Docker Compose.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (preferably the latest LTS version)
- Yarn package manager
- Docker Desktop for running containers

## Local Development

### Install Dependencies

First, install all necessary dependencies for the project. Open your terminal and run the following command in the root directory of your project:

bash

> Copy code

    yarn install

> Copy code

    yarn dev

### Setup Environment Variables

Setting up environment variables is crucial for managing settings and configurations that should not be hardcoded in your source code, such as URLs, etc. Here’s how to set them up:

1. **Duplicate the example environment file**: Start by duplicating the `.env.example` file in your project directory. This file usually contains all the necessary environment variables with placeholder values or comments on what each variable is used for. In your terminal, run:

    ```bash
    cp .env.example .env
    ```

    This command creates a copy of `.env.example` and names the copy `.env`, which will be your active environment file.

2. **Edit the `.env` file**: Open the `.env` file in your preferred text editor. Replace the placeholder values with your specific configurations. For instance:

    - `NEXT_PUBLIC_BACKEND_API=your_backend_api`

This command reads the `package.json` file and installs all the dependencies listed under `dependencies` and `devDependencies`.

## Running Frontend via Docker Compose

Docker Compose allows you to define and run multi-container Docker applications. Here, we’ll use it to build and run our Frontend in a Docker environment.

### Starting the Services

Ensure Docker Desktop is running, then deploy your services using Docker Compose with the following command:

bash

> Copy code

    docker compose up -d

- `docker compose up`: Builds, (re)creates, starts, and attaches to containers for a service.
- `-d`: Detaches and runs the containers in the background.

This command reads the `docker-compose.yml` file from your project directory, builds the Docker image for the Frontend.

### Checking the Container Status

After starting the containers, you can check the status of the containers by running:

bash

> Copy code

    docker compose ps

This command lists all containers that are running under the Docker Compose configuration in the current directory.

### Stopping the Services

When you’re done, you can stop and remove the containers, networks, and volumes set up by Docker Compose using:

bash

> Copy code

    docker compose down

This will stop all running containers and clean up any resources that were used during the session.
