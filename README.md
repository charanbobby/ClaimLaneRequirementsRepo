# Mermaid CLI with Docker

This guide explains how to use the Mermaid CLI via Docker to visualize diagrams and export them as high-quality images.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) must be installed and running on your system.

## Quick Start

The simplest way to render a diagram is to run the following command in your terminal. This command mounts your current directory to the container and renders `WorkFlow Mermaid` to `WorkFlow.png`.

```powershell
docker run --rm -v ${PWD}:/data minlag/mermaid-cli -i "WorkFlow Mermaid" -o WorkFlow.png -s 4
```

### Command Breakdown

- `docker run --rm`: Runs the container and removes it after execution.
- `-v ${PWD}:/data`: Mounts your current working directory to the `/data` folder inside the container.
- `minlag/mermaid-cli`: The official Mermaid CLI Docker image.
- `-i "WorkFlow Mermaid"`: The input file (Mermaid diagram).
- `-o WorkFlow.png`: The output filename.
- `-s 4`: **Hi-Res Output.** Scales the image by 4x for a high-resolution export.

## Using the Helper Script

For convenience, you can use the provided PowerShell script:

1. Open a PowerShell terminal in this directory.
2. Run the script:
   ```powershell
   .\render_mermaid.ps1 -InputFile "WorkFlow Mermaid" -OutputFile "WorkFlow.png"
   ```

## Exporting Different Formats

You can export to various formats by changing the extension of the output file:

- **SVG:** `-o diagram.svg`
- **PDF:** `-o diagram.pdf` (Requires additional setup in some environments)

## Customization

- **Theme:** Add `-t dark` for a dark theme or `-t forest`.
- **Background:** Add `-b transparent` for a transparent background.
- **Scale:** Increase the `-s` value (e.g., `-s 10`) for even higher resolution.
