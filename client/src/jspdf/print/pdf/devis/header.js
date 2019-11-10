import newPage from '../../newPage';

export default (doc, printData, startY, fontSize, lineSpacing) => {

    let startX = 57;
    const pageWidth = doc.internal.pageSize.width;
    const endX =  pageWidth - startX;

    const tablecol1X = 226;
    const tablecol2X = 426;

    doc.setFontSize(fontSize);
    doc.setFontType('normal');

    //-------Table---------------------
    startY += lineSpacing;

    const sender = Object.values(printData.addressSender);
    const infosInvoice = Object.values(printData.infosInvoice);

    sender.map(item => {

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

    infosInvoice.map(item => {
      const splitTitle = doc.splitTextToSize(
          item,
          tablecol2X - startX - lineSpacing * 1
      );
      const heightTitle = splitTitle.length * doc.internal.getLineHeight();

      // <><>><><>><>><><><><><>>><><<><><><><>
      // new page check before item output
      // @todo: display table header at start of a new page
      startY = newPage(doc, startY, heightTitle);

      doc.text(splitTitle, tablecol2X, startY - 70);
      startY += heightTitle;
    });

    return startY;
}
