param (
    [Parameter(Mandatory = $false)]
    [string]$InputFile = "WorkFlow Mermaid",

    [Parameter(Mandatory = $false)]
    [string]$OutputFile = "WorkFlow.png",

    [Parameter(Mandatory = $false)]
    [int]$Scale = 4,

    [Parameter(Mandatory = $false)]
    [string]$Theme = "default"
)

# Standardize paths for Docker
$currentDir = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath(".\")

Write-Host "Rendering $InputFile to $OutputFile with scale $Scale and theme $Theme..." -ForegroundColor Cyan

# Run the docker command
docker run --rm -v "${currentDir}:/data" minlag/mermaid-cli -i "/data/$InputFile" -o "/data/$OutputFile" -s $Scale -t $Theme

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! File generated: $OutputFile" -ForegroundColor Green
}
else {
    Write-Host "Error: Mermaid CLI failed to render the diagram. Please ensure Docker is running." -ForegroundColor Red
}
