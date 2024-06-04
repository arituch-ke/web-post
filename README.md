# Frontend Setup Guide

This guide provides step-by-step instructions on how to set up and run the Frontend locally using Yarn.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (preferably the latest LTS version)
- Yarn package manager

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