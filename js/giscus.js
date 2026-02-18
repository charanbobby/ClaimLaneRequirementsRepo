(function () {
    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';

    // CONFIGURATION START
    script.setAttribute('data-repo', 'charanbobby/ClaimLaneRequirementsRepo');
    script.setAttribute('data-repo-id', 'R_kgDOQnbnGA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQnbnGM4Czsyb');
    // CONFIGURATION END

    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;

    var container = document.querySelector('.giscus-placeholder');
    if (container) {
        container.appendChild(script);
    }
})();
