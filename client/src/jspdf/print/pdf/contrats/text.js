import newPage from '../../newPage';

export default (doc, printData, startY, pageCenterX, pageWidth, fontSize, lineSpacing) => {

    let startX = 57;
    startY += lineSpacing * 12;

    doc.setFontSize(fontSize + 10);
    doc.setTextColor(98, 62, 197);
    doc.text(printData.contrat.titre, pageCenterX, 90, 'center');

    doc.setDrawColor(180, 153, 232);
    doc.setLineWidth(2);
    doc.line(57, 100, (pageWidth - 57), 100);

    doc.setFontSize(fontSize);
    doc.setTextColor(25, 25, 25);
    let splitText = doc.splitTextToSize(
        printData.contrat.text,
        485
    );

    // <><>><><>><>><><><><><>>><><<><><><><>
    // new page check before text output
    const pageHeight = doc.internal.pageSize.height;
    const endY = pageHeight - 57; // minus footerHeight
    const neededSpacing = lineSpacing;
    let neededHeight = splitText.length * doc.internal.getLineHeight();
    let spaceForLines = Math.floor((endY - startY) / doc.internal.getLineHeight());

    // check if new page is needed right at beginning
    startY = newPage(doc, startY, neededSpacing);

    // <><>><><>><>><><><><><>>><><<><><><><>
    // power algorithm to split long text on multiple pages
    let textStart;

    while (endY - startY - neededHeight < 0 && splitText.length > spaceForLines) {

        startY += lineSpacing * -3;
        spaceForLines = Math.floor((endY - startY) / doc.internal.getLineHeight());
        neededHeight = splitText.length * doc.internal.getLineHeight();

        textStart = splitText.slice(0,spaceForLines);
        doc.setFont('Inter-UI');
        doc.text(textStart, startX, startY);

        splitText = splitText.slice(spaceForLines);
        startY = newPage(doc, startY, neededHeight);
    }

    // need to set font here again, else weirdo things are printed out
    doc.setTextColor(25, 25, 25);
    doc.setFontSize(fontSize);
    doc.text(splitText, startX, startY);
    neededHeight = splitText.length * doc.internal.getLineHeight();
    startY += neededHeight + lineSpacing;

    const endX =  pageWidth - startX;
    const tablecol1X = 57;
    const tablecol2X = 316;

    doc.text('Fait le : ' + printData.contrat.date, startX, startY);
    startY += lineSpacing * 3;
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);
    //-------Client---------------------
    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.contrat.clientNomLabel, startX, startY);
    doc.setFontType('normal');
    doc.text(printData.contrat.clientNom, startX, startY + 13);
    doc.setFontType('bold');
    doc.text(printData.contrat.signatureClientLabel, tablecol2X, startY);
    startY += lineSpacing * 1.5;

    //-------Prestataire---------------------
    startY += lineSpacing * 5;
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);

    startY += lineSpacing * 1.5;
    doc.setFontType('bold');
    doc.text(printData.contrat.prestaNomLabel, startX, startY);
    doc.setFontType('normal');
    doc.text(printData.contrat.prestaNom, startX, startY + 13);
    doc.setFontType('bold');
    doc.text(printData.contrat.signaturePrestaLabel, tablecol2X, startY);
    startY += lineSpacing * 1.5;

    return startY;
}
