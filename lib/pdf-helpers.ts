// jsPDF helvetica is WinAnsi — it does not support full Unicode. Strip
// accents and map a handful of common Latin characters to ASCII so names
// like "Café Señor" don't render as garbled glyphs in generated PDFs.
export function sanitizePdfText(input: string): string {
  if (!input) return ''
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00f1/g, 'n')
    .replace(/\u00d1/g, 'N')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2022/g, '*')
}
