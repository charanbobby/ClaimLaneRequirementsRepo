# Use a lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /docs

# Install system dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port mkdocs serves on
EXPOSE 8000

# Default entrypoint to mkdocs
ENTRYPOINT ["mkdocs"]

# Default command for serving
CMD ["serve", "--dev-addr", "0.0.0.0:8000"]
