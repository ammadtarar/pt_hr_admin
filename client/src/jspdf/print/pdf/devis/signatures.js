import newPage from '../../newPage';

export default (doc, printData, startY, fontSize, lineSpacing) => {

    let startX = 57;
    const pageWidth = doc.internal.pageSize.width;
    const endX =  pageWidth - startX;

    const tablecol1X = 57;
    const tablecol2X = 316;

    startY += lineSpacing * 5;
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);

    //-------Client---------------------
    startY += lineSpacing * 1.5;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(fontSize);
    doc.setFontType('bold');
    doc.text(printData.signatures.nomClientLabel, startX, startY);
    doc.setFontType('normal');
    doc.text(printData.addressSender.person, startX, startY + 13);
    doc.setFontType('bold');
    doc.text(printData.signatures.signatureClientLabel, tablecol2X, startY);
    startY += lineSpacing * 1.5;

    //-------Prestataire---------------------
    startY += lineSpacing * 7;
    doc.setDrawColor(230, 234, 236);
    doc.setLineWidth(0.5);
    doc.line(startX, startY, endX, startY);

    startY += lineSpacing * 1.5;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(fontSize);
    doc.setFontType('bold');
    doc.text(printData.signatures.nomSenderLabel, startX, startY);
    doc.setFontType('normal');
    doc.text(printData.address.person, startX, startY + 13);
    doc.setFontType('bold');
    doc.text(printData.signatures.signatureSenderLabel, tablecol2X, startY);
    startY += lineSpacing * 1.5;

    return startY;
}
