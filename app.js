
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

