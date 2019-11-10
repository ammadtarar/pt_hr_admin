import jsPDF from 'jspdf-yworks';
import 'jspdf-customfonts';
import './default_vfs';
import svg2pdf from 'svg2pdf.js';
import fetchSvg from './fetchSvg';
import setFont from './setFont';
import text from './pdf/contrats/text';

export default (printData) => {

    const doc = new jsPDF('p', 'pt');

    setFont(doc);

    // <><>><><>><>><><><><><>>><><<><><><><>
    // SETTINGS
    // <><>><><>><>><><><><><>>><><<><><><><>
    const fontSizes = {
        TitleFontSize:28,
        SubTitleFontSize:12,
        NormalFontSize:12,
        SmallFontSize:12
    };
    const lineSpacing = 12;

    let startY = 30; // bit more then 45mm

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const pageCenterX = pageWidth / 2;

    // COMPONENTS
    // Background init
    fetchSvg(doc, '').then((svg) => {
        if (svg) {
            doc.setPage(1);

            svg2pdf(svg, doc, {
                xOffset: -70,
                yOffset: 250,
                scale: 5.6
            });

            localStorage.setItem('bgSvg', new XMLSerializer().serializeToString(svg));
        }

        startY = text(doc, printData, startY, pageCenterX, pageWidth, fontSizes.NormalFontSize, lineSpacing);

        // REPEATED PAGE COMPONENTS
        const pageNr = doc.internal.getNumberOfPages();
        let n = 0;

        // Logo
        const logoLoaded = fetchSvg(doc, '').then((logoSvg) => {
            if (logoSvg) {
                n = 0;

        while (n < pageNr) {
            n++;

            doc.setPage(n);

                    svg2pdf(logoSvg, doc, {
                        xOffset: 50,
                        yOffset: 35,
                        scale: 0.025
                    });

            doc.link(57, 30, 50, 50, {url: printData.personalInfo.website});
        }
            }
        });

        // Page Numbers
        if (pageNr > 1) {
            n = 0;
            doc.setFontSize(fontSizes.SmallFontSize);

            while (n < pageNr) {
                n++;
                doc.setPage(n);
                doc.setFont('Inter-UI');
                doc.setFontType('normal');
                doc.setTextColor(168, 168, 168);
                doc.text(n + ' / ' + pageNr, pageCenterX, pageHeight - 30, 'center');
            }
        }

        // PRINT
        Promise.all([logoLoaded]).then(() => {
          // doc.save("invoice.pdf");
          window.open(doc.output('bloburl'));
        });
    });
}
