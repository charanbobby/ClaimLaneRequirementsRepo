document.addEventListener("DOMContentLoaded", function () {
    // Configuration
    var MAX_ATTEMPTS = 50; // 5 seconds total
    var CHECK_INTERVAL = 100; // 100ms
    var attemptCount = 0;

    console.log("[Mermaid-Zoom] Script loaded.");

    var initZoom = setInterval(function () {
        var diagrams = document.querySelectorAll(".mermaid svg");

        if (diagrams.length > 0) {
            console.log("[Mermaid-Zoom] Found " + diagrams.length + " diagrams.");

            diagrams.forEach(function (svgElement, index) {
                // Check if already initialized to prevent double-init (though we clear interval, just safety)
                if (svgElement.getAttribute('data-pan-zoom-initialized')) return;

                try {
                    // Set styles to ensure visibility and proper behavior
                    svgElement.style.maxWidth = 'none';
                    // We don't force height here to let the diagram aspect ratio dictate, 
                    // but we ensure the container allows overflow if needed

                    svgPanZoom(svgElement, {
                        zoomEnabled: true,
                        controlIconsEnabled: true,
                        fit: true,
                        center: true,
                        minZoom: 0.1,
                        maxZoom: 10
                    });

                    svgElement.setAttribute('data-pan-zoom-initialized', 'true');
                    console.log("[Mermaid-Zoom] Initialized zoom on diagram " + index);

                } catch (e) {
                    console.error("[Mermaid-Zoom] Failed to initialize on diagram " + index, e);
                }
            });

            // Once we found and tried to init diagrams, we can stop? 
            // Better to check if all expected diagrams are handled. 
            // For now, clearing interval once we find *any* is a decent heuristic for this page 
            // assuming all load at once.
            clearInterval(initZoom);
        } else {
            attemptCount++;
            if (attemptCount >= MAX_ATTEMPTS) {
                console.warn("[Mermaid-Zoom] No mermaid diagrams found after timeout.");
                clearInterval(initZoom);
            }
        }
    }, CHECK_INTERVAL);
});
