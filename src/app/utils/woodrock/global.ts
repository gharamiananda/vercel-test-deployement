export async function generateWoodrockHeader(
  doc: PDFKit.PDFDocument,
  imageHeight?: number
) {
  doc.image("https://raw.githubusercontent.com/gharamiananda/vercel-test-deployement/main/dist/woodrock-small-height_banner.png", 50, 20, {
    width: 495,
    height: imageHeight || 90,
  });
}

