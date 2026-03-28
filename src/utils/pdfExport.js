// Import html2pdf - make sure to install: npm install html2pdf.js
import html2pdf from 'html2pdf.js';

export const exportToPDF = async (elementId, filename = 'github_profile.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF export');
    return false;
  }
  
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  
  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
};

export const copyProfileLink = (username) => {
  const url = `${window.location.origin}?user=${username}`;
  navigator.clipboard.writeText(url);
  return url;
};