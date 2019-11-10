import jsPDF from 'jspdf-yworks';
import 'jspdf-customfonts';
import './default_vfs';
import svg2pdf from "svg2pdf.js";
import fetchSvg from './fetchSvg';
import setFont from './setFont';
import header from './pdf/devis/header';
import addressCustomerSender from './pdf/devis/addressCustomerSender';
import heading from './pdf/devis/heading';
import table from './pdf/devis/table';
import totals from './pdf/devis/totals';
import signatures from './pdf/devis/signatures';
import text from './pdf/devis/text';

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

        startY = header(doc, printData, startY, fontSizes.NormalFontSize, lineSpacing);
        startY = addressCustomerSender(doc, printData, startY, fontSizes.NormalFontSize, lineSpacing);

        // INVOICE DATA
        startY = heading(doc, printData, startY, fontSizes, lineSpacing);
        startY = table(doc, printData, startY, fontSizes.NormalFontSize, lineSpacing);
        startY = totals(doc, printData, startY, fontSizes.NormalFontSize, lineSpacing);
        startY = signatures(doc, printData, startY, fontSizes.NormalFontSize, lineSpacing);
        startY = text(doc, printData.invoice.text, startY, fontSizes.NormalFontSize, lineSpacing);

        // REPEATED PAGE COMPONENTS
        const pageNr = doc.internal.getNumberOfPages();
        let n = 0;

        // Logo
        const logoLoaded = fetchSvg(doc, '/img/favicon-A-2.svg').then((logoSvg) => {
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

                doc.setDrawColor(99, 62, 197);
                doc.setLineWidth(8);
                const startX = 0;
                const endX =  pageWidth - startX;
                doc.line(startX, 2, endX, 2);

                doc.setDrawColor(230, 234, 236);
                doc.setLineWidth(0.5);
                doc.line(0, pageHeight - 70, pageWidth, pageHeight - 70);

                doc.setTextColor(168, 168, 168);
                doc.text(n + ' / ' + pageNr, pageWidth - 72, pageHeight - 30, 'center');
                doc.setFontSize(fontSizes.SmallFontSize - 4);
                doc.text(printData.personalInfo.statut + ' - ' + printData.personalInfo.compagny + ' - ' + printData.addressSender.street + ' ' + printData.addressSender.city, 57, pageHeight - 50);
                doc.text('N° DE SIRET: ' + printData.personalInfo.siret, 57, pageHeight - 40);
                doc.text('Banque: ' + printData.personalInfo.bank.IBAN, 57, pageHeight - 30);
                doc.text('N° TVA intracommunautaire: ' + printData.personalInfo.tva, 57, pageHeight - 20);
            }
        }

        if (pageNr > 1) {
            n = 1;

            while (n < pageNr) {
                n++;
                doc.setPage(n);

                doc.setFontType('bold');
                doc.setTextColor(168, 168, 168);
                doc.setFontSize(fontSizes.SmallFontSize);
                doc.text('DEVIS', pageWidth - 57, 45, 'right');
            }
        }

        // PRINT
        Promise.all([logoLoaded]).then(() => {
          // doc.save("invoice.pdf");
          window.open(doc.output('bloburl'));
        });
    });
}
