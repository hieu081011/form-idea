export const printPDF = async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: "pt",
        format: "a4",
    });

    const element = document.querySelector(".document-wrapper");

    element
        .querySelectorAll(".my-content-editor")
        .forEach((ele) => ele.remove());
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Calculate the dimensions of the image in the PDF
    const imgWidth = 595.28; // A4 width in pt
    const pageHeight = 841.89; // A4 height in pt
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add more pages if content overflows
    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    doc.save("sample.pdf");
};
