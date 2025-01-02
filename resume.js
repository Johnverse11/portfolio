document.addEventListener('DOMContentLoaded', function() {
    // Check if PDFJS is defined
    if (typeof pdfjsLib !== 'undefined') {
        // PDF.js is loaded, proceed with initialization
        console.log("PDF.js library loaded successfully!");

        const pdfURL = 'assets/pdfs/JOHN_RESUME.pdf'; // Ensure this is the correct path
        const pdfViewer = document.getElementById('pdf-viewer');
        const loadingIndicator = document.getElementById('loading-indicator');

        // Function to render PDF
        async function renderPDF(url) {
            try {
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;

                loadingIndicator.style.display = 'none'; // Hide loading indicator

                // Adjust scale for better visibility
                // Responsive scaling: use a larger scale for wider screens (desktops/tablets) and a smaller scale for narrower screens (mobile devices)
                const scale = window.innerWidth > 786 ? 1.7 : 0.6;
                const renderPage = async (pageNum) => {
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
                };

                const renderPromises = [];
                    renderPromises.push(renderPage(pageNum));
                await Promise.all(renderPromises);
            } catch (error) {
                console.error('Error loading or rendering PDF:', error);
                loadingIndicator.innerHTML = 'Failed to load resume. Please try again later.';
            }
        }

        // Function to download the resume

        // Load and render the PDF on page load
        renderPDF(pdfURL);
    } else {
        console.error("PDF.js library still not loaded!");
    }
});
