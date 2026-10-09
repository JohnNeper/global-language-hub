export async function downloadDemoPdf(filename: string, body: string, notice: string) {
 const { jsPDF } = await import('jspdf');
 const pdf = new jsPDF();
 pdf.setFont('helvetica','bold'); pdf.setFontSize(24); pdf.text('CanVerify',20,26);
 pdf.setFontSize(10); pdf.text('GFASC CANADA | SECURE PORTAL v5.0',20,35);
 pdf.setLineWidth(.4); pdf.line(20,42,190,42);
 pdf.setFontSize(10); pdf.text(pdf.splitTextToSize(notice.replaceAll('—','-'),170),20,54);
 pdf.setFont('helvetica','normal'); pdf.setFontSize(12);
 const lines: string[] = pdf.splitTextToSize(body.replaceAll('™','').replaceAll('…','...').replaceAll('—','-'),170);
 let y = 77;
 for (const line of lines) { if (y > 265) { pdf.addPage(); y = 25; } pdf.text(line,20,y); y += 8; }
 pdf.setFontSize(9); pdf.text('DEMO - NO OFFICIAL VALIDITY',20,286);
 pdf.save(filename.replace(/\.(txt|pdf)$/i,'')+'.pdf');
}
