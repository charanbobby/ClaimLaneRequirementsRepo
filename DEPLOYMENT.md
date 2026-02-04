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
python custom_serve.py
```
*Note: We use `custom_serve.py` instead of the standard `mkdocs serve` to ensure file changes are detected correctly on Windows.*
Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.


## Static Site Build

To generate a static version of the site (HTML/CSS/JS files) without running a server:

```sh
mkdocs build
```
This creates a `site/` directory containing the full static website.

**When is this necessary?**
1.  **Debugging:** If you suspect an issue is due to the live reload server, the build output shows exactly what will be deployed.
2.  **Hosting Elsewhere:** if you want to host the files on a standard web server (Apache/Nginx) instead of GitHub Pages.
3.  **Verification:** To confirm that all files and navigation links are generated correctly before pushing code.

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

## Troubleshooting

### 1. PowerShell Security Error (UnauthorizedAccess)
If you see `...cannot be loaded because running scripts is disabled on this system`, run this command in PowerShell to allow the script:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Or, skip activation and run `mkdocs` directly:
```powershell
.\venv\Scripts\mkdocs serve
```

### 2. "MkDocs not recognized"
If `mkdocs` command fails, try running it via the full path:
```powershell
.\venv\Scripts\mkdocs build
```

### 3. Missing Pages / Content Not Updating
If you edit files (e.g., adding `15-changelog.md`) but `mkdocs serve` is not showing them (or showing "404 Not Found" for new pages):
1. **Check for stale processes**: You might have an old `mkdocs` running in the background listening on port 8000.
    ```powershell
    netstat -ano | findstr :8000 | findstr LISTENING
    ```
2. **Kill the process**: Take the PID (number on the far right) and kill it.
    ```powershell
    taskkill /PID <PID> /F
    ```
3. **Restart Serve**:
    ```powershell
    python custom_serve.py
    ```
