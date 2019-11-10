import newPage from "../../newPage";

export default (doc, printData, startY, fontSize, lineSpacing) => {
    let startX = 57;
    const pageWidth = doc.internal.pageSize.width;
    const endX =  pageWidth - startX;

    const tablecol3X = 460;

    // <><>><><>><>><><><><><>>><><<><><><><>
    // new page check before totals output
    const neededHeight = lineSpacing * 2 + lineSpacing;
    startY = newPage(doc, startY, neededHeight);

    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);

    doc.setFontSize(fontSize);

    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.label.totalht, tablecol3X, startY, 'right');
    doc.setFontType('normal');
    doc.text(printData.invoice.totalht, endX, startY, 'right');

    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.label.remise, tablecol3X, startY, 'right');
    doc.setFontType('normal');
    doc.text(printData.invoice.remise, endX, startY, 'right');

    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.label.tva, tablecol3X, startY, 'right');
    doc.setFontType('normal');
    doc.text(printData.invoice.tva, endX, startY, 'right');

    startY += lineSpacing * .7;
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);

    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.label.totalGrand, tablecol3X, startY, 'right');
    doc.setTextColor(99, 62, 197);
    doc.text(printData.invoice.total, endX, startY, 'right');
    startY += lineSpacing * 1;
    doc.setFontSize(fontSize - 3);
    doc.setTextColor(168, 168, 168);
    doc.setFontType('normal');
    doc.text(printData.label.statutAE, endX, startY + 7, 'right');

    doc.setFontType('bold');
    doc.setFontSize(fontSize);
    doc.setTextColor(30, 30, 30);
    doc.text("L'acceptation de devis donne lieu au versement d'un acompte de " + printData.invoice.acomptePourcent, startX + 36, startY + 35);
    doc.text("Soit: " + printData.invoice.acompte, (pageWidth / 2) - 35, startY + 50);

    return startY;
}
