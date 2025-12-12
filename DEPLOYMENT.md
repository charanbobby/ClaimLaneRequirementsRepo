# Deployment Guide

This repository contains the source code for the ClaimLane Requirements MkDocs site. The site is hosted on GitHub Pages.

## Prerequisites

- [Python](https://www.python.org/downloads/) installed.
- [Git](https://git-scm.com/downloads) installed.

## Setup

1.  **Clone the repository** (if you haven't already):
    ```sh
    git clone https://github.com/charanbobby/ClaimLaneRequirementsRepo.git
    cd ClaimLaneRequirementsRepo
    ```

2.  **Create and activate a virtual environment**:
    ```sh
    python -m venv venv
    .\venv\Scripts\Activate
    ```

3.  **Install dependencies**:
    ```sh
    pip install mkdocs mkdocs-material
    ```

## Local Development

To review changes locally before deploying:

```sh
mkdocs serve
```
Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

## Deployment

To deploy changes to the live site:

1.  **Commit your changes**:
    ```sh
    git add .
    git commit -m "Description of changes"
    git push origin main
    ```

2.  **Deploy to GitHub Pages**:
    ```sh
    mkdocs gh-deploy
    ```
    (Or `.\venv\Scripts\mkdocs gh-deploy` if standard command fails).

3.  **Verify**:
    Visit [https://charanbobby.github.io/ClaimLaneRequirementsRepo/](https://charanbobby.github.io/ClaimLaneRequirementsRepo/).
    *Note: It may take a minute for updates to appear.*
