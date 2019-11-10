import svg2pdf from "svg2pdf.js";

export default (doc, startY, neededHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    const endY = pageHeight - 120; // minus footerHeight
    const newPageY = 120;

    if (endY - startY - neededHeight < 0) {
        doc.addPage();
        return newPageY;
    }
    return startY;
};
