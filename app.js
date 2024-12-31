

// Typewriter Effect
const typewriter = document.querySelector('.Typewriter__wrapper');
const text = "Software Developer | AI Enthusiast";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    }
}

window.onload = function() {
    typeEffect();
};

async function renderPDF(url) {
    const pdfViewer = document.getElementById('pdf-viewer');
    const loadingIndicator = document.getElementById('loading-indicator');

    try {
        console.log('Loading PDF...');
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        console.log('PDF loaded', pdf);

        loadingIndicator.style.display = 'none'; // Hide loading indicator

        const scale = 1.5;  // Increase or decrease the scale value as needed
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
            pdfViewer.appendChild(canvas);
            console.log('Page rendered', pageNum);
        }
    } catch (error) {
        console.error('Error loading or rendering PDF:', error);
        loadingIndicator.innerHTML = 'Error loading resume. Please try again.';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;

        // Reinitialize Bootstrap's JavaScript for interactive components
        var script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
        document.body.appendChild(script);
    })
    .catch(error => console.error('Error loading navbar:', error));

    // Include the pdfjsLib library
    const pdfjsLib = window['pdfjs-dist/build/pdf'];