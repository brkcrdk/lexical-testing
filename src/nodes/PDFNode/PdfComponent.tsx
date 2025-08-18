import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import testPdf from "./test2.pdf";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

interface PDFPageInfo {
  pageNumber: number;
  pageName: string;
  readingTime: number; // dakika cinsinden
}

function PdfComponent() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  // const [re]

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <section className="flex justify-center items-center flex-col gap-2">
      <header className="flex justify-between w-full border-1 rounded-md p-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setScale((prev) => prev + 0.1)}>
            <ZoomInIcon />
          </button>
          <button onClick={() => setScale((prev) => prev - 0.1)}>
            <ZoomOutIcon />
          </button>
        </div>
        <h3>File Name</h3>
        <div>
          <span>Okuma Süresi: 20dk</span>
        </div>
      </header>
      <div className="relative overflow-hidden">
        <Document
          file={testPdf}
          onLoadSuccess={onDocumentLoadSuccess}
          className="aspect-video w-fit">
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="border-1 border-dashed border-blue-600"
            loading="Sayfa yükleniyor..."
            error="Sayfa yüklenirken hata oluştu."
          />
        </Document>
      </div>
      <footer className="flex items-center gap-2 border-1 rounded-md p-2">
        <button onClick={() => setPageNumber((prev) => prev - 1)}>
          <ChevronLeftIcon />
        </button>
        <span>
          {pageNumber} / {numPages}
        </span>
        <button onClick={() => setPageNumber((prev) => prev + 1)}>
          <ChevronRightIcon />
        </button>
      </footer>
    </section>
  );
}

export default PdfComponent;
