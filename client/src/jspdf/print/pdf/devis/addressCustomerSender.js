import newPage from '../../newPage';

export default (doc, printData, startY, fontSize, lineSpacing) => {

    let startX = 57;
    const pageWidth = doc.internal.pageSize.width;
    const endX =  pageWidth - startX;

    const tablecol1X = 57;
    const tablecol2X = 316;

    startY += lineSpacing * 6;
    doc.setFontSize(fontSize + 18);
    doc.setFontType('bold');
    doc.setTextColor(1, 1, 1);
    doc.text('Devis', startX, startY - 60);
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(.5);
    doc.line(startX, 205, endX, 205);

    //-------Table Header---------------------
    startY += lineSpacing * -2;
    doc.setTextColor(98, 62, 197);
    doc.setFontSize(fontSize);
    doc.setFontType('normal');
    doc.text('Commandé par', startX, startY);
    doc.text('Paiement à', tablecol2X, startY);

    startY += lineSpacing * 1.5;

    //-------Table---------------------
    doc.setTextColor(25, 25, 25);
    const sender = Object.values(printData.addressSender);
    const client = Object.values(printData.address);

    client.map(item => {

        const splitDescription = doc.splitTextToSize(
            item,
            tablecol2X - startX - lineSpacing * 1
        );
        const heightDescription = splitDescription.length * doc.internal.getLineHeight();

        // <><>><><>><>><><><><><>>><><<><><><><>
        // new page check before item output
        // @todo: display table header at start of a new page
        startY = newPage(doc, startY, heightDescription);

        doc.text(splitDescription, tablecol1X, startY);
        startY += heightDescription;
    });

    sender.map(item => {

        const splitTitle = doc.splitTextToSize(
            item,
            tablecol2X - startX - lineSpacing * 1
        );
        const heightTitle = splitTitle.length * doc.internal.getLineHeight();

        // <><>><><>><>><><><><><>>><><<><><><><>
        // new page check before item output
        // @todo: display table header at start of a new page
        startY = newPage(doc, startY, heightTitle);

        doc.text(splitTitle, tablecol2X, startY - 57);
        startY += heightTitle;
    });

    return startY;
}
