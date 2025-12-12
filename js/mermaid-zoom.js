document.addEventListener("DOMContentLoaded", function () {
    // Wait for a short period to ensure mermaid has rendered
    var attemptCount = 0;
    var maxAttempts = 20; // Try for 2 seconds (20 * 100ms)

    var initZoom = setInterval(function () {
        var svgElement = document.querySelector(".mermaid svg");

        if (svgElement) {
            clearInterval(initZoom);

            // Ensure the SVG has an ID for svg-pan-zoom explicitly if needed, but usually passing the element works.
            // Adjust styles to ensure the container handles the zoom object correctly
            svgElement.style.maxWidth = 'none';
            svgElement.style.height = '600px'; // Give it a fixed height frame or let it be flexible?
            // Usually 100% width and a fixed/min height is good for pan/zoom

            try {
                svgPanZoom(svgElement, {
                    zoomEnabled: true,
                    controlIconsEnabled: true,
                    fit: true,
                    center: true,
                    minZoom: 0.5,
                    maxZoom: 10
                });
            } catch (e) {
                console.error("Failed to initialize svg-pan-zoom:", e);
            }
        }

        attemptCount++;
        if (attemptCount >= maxAttempts) {
            clearInterval(initZoom);
        }
    }, 100);
});
