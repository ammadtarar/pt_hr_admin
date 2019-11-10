export default (doc, data, startY, fontSizes, lineSpacing) => {

    let startX = 57;
    const pageWidth = doc.internal.pageSize.width;
    const endX =  pageWidth - startX;

    startY += lineSpacing;

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.SubTitleFontSize);

    startY = 243;

    // @todo: font replacement for good width calculation. because else not working with my custom font :(
    startY += lineSpacing * 2;
    startX = 57;

    doc.setDrawColor(99, 62, 197);
    doc.setLineWidth(2);
    startY += lineSpacing;
    doc.line(startX, startY + 40, endX, startY + 40);

    return startY;
}
