# Deployment Guide

This repository contains the source code for the ClaimLane Requirements MkDocs site. The site is hosted on GitHub Pages.

## Prerequisites

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** installed and running.
- [Git](https://git-scm.com/downloads) installed.
- (Optional) [Python 3.10+](https://www.python.org/downloads/) for legacy local development.

## Setup (Docker) - Recommended

The project is configured to run in Docker to ensure the environment is consistent across different machines and user profiles.

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/charanbobby/ClaimLaneRequirementsRepo.git
    cd ClaimLaneRequirementsRepo
    ```

2.  **Build the Docker environment**:
    ```sh
    docker compose build
    ```

## Local Development (Docker)

To start the preview server locally:

```sh
docker compose up
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Changes to your markdown files will be automatically reflected.

## Portability: Moving Docker Storage to D:

If you are using an external drive (D:) and want to share your Docker images/containers across two laptops:

1.  Open **Docker Desktop Settings**.
2.  Go to **Resources** > **Advanced**.
3.  Change **Disk image location** to `D:\DockerStorage`.
4.  Apply and Restart.
5.  Repeat this on the second laptop, pointing to the same folder on the drive.

## Static Site Build (Docker)

To generate the static HTML files in the `site/` folder:

```sh
docker compose run --rm mkdocs build
```

## Deployment to GitHub Pages

To deploy changes to the live site:

1.  **Commit your changes**:
    ```sh
    git add .
    git commit -m "Description of changes"
    git push origin main
    ```

2.  **Run the deployment command**:
    ```sh
    docker compose run --rm mkdocs gh-deploy
    ```

3.  **Verify**:
    Visit [https://charanbobby.github.io/ClaimLaneRequirementsRepo/].

---

## Alternative/Legacy Setup (Local Venv)

If you cannot use Docker, you can still set up a local Python environment:

1.  **Create and activate a virtual environment**:
    ```sh
    python -m venv venv
    .\venv\Scripts\Activate
    ```

2.  **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

3.  **Local Serve**:
    ```sh
    python custom_serve.py
    ```

4.  **Local Build/Deploy**:
    ```sh
    mkdocs build
    mkdocs gh-deploy
    ```

## Troubleshooting (Docker)

### "Docker not recognized"
Ensure Docker Desktop is running. You may need to restart your terminal after installing Docker.

### Port 8000 is occupied
If another process is using port 8000, you can stop the existing container:
```sh
docker compose down
```

### Site not updating
Try rebuilding the image if you've added new dependencies:
```sh
docker compose build --no-cache
```
