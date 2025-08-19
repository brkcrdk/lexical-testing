import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import testPdf from "./test2.pdf";


import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function PdfCanvas() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <div className="relative overflow-hidden p-2 justify-center items-center flex">
      <Document
        file={testPdf}
        onLoadSuccess={onDocumentLoadSuccess}
        className="aspect-video w-fit">
        <Page
          pageNumber={pageNumber}
          scale={scale}
          className="relative group"
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu."></Page>
      </Document>
    </div>
  );
}
export default PdfCanvas;
