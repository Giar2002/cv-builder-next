export async function exportToPDF(elementId: string, filename = 'cv.pdf') {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) return;

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const DPI = 150;
    const MM_TO_PX = DPI / 25.4;
    const pageWidthPx = Math.round(A4_WIDTH_MM * MM_TO_PX);
    const pageHeightPx = Math.round(A4_HEIGHT_MM * MM_TO_PX);

    const canvas = await html2canvas(element, {
        scale: DPI / 96,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.scrollHeight,
    });

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const totalHeightPx = canvas.height;
    const totalPages = Math.ceil(totalHeightPx / pageHeightPx);

    for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const srcY = page * pageHeightPx;
        const srcHeight = Math.min(pageHeightPx, totalHeightPx - srcY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = srcHeight;
        const ctx = pageCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcHeight, 0, 0, canvas.width, srcHeight);

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const imgHeightMM = (srcHeight / MM_TO_PX);
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, imgHeightMM);
    }

    pdf.save(filename);
}
