import jsPDF from "jspdf";
export const generateNewPDF = (color, codes, image, footerImage, ratio) => {
  let doc = new jsPDF("A4");
  // pdf header
  doc.addImage(image, "JPEG", 80, 5, 50, ratio);
  doc.setFillColor(color);
  doc.rect(5, 30, 200, 7, "F");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("BackUp-Codes für Ihre 2-Faktor-Authentifizierung", 10, 50);
  doc.line(10, 55, 195, 55);
  // pdf content
  let positionY = 75;
  let nr = 1;
  codes.forEach((code) => {
    doc.setFillColor(color);
    doc.circle(80, positionY - 2, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(nr.toString(), 78, positionY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(0);
    doc.text(code, 95, positionY);
    positionY = positionY + 25;
    nr++;
  });
  // pdf footer
  doc.setFont("helvetica", "bold");
  doc.setDrawColor(0);
  doc.setFillColor(50, 50, 50);
  doc.rect(5, 260, 200, 30, "F");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("cadooz GmbH", 15, 270);
  doc.setFont("helvetica", "normal");
  doc.text("Osterbekstraße 90b", 15, 275);
  doc.text("22083 Hamburg – Germany", 15, 280);
  doc.addImage(footerImage, "JPEG", 145, 267, 55, 15);
  doc.save("Backup_Codes.pdf");
};
