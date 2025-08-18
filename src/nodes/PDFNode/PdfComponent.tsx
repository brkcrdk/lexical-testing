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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    // <section className="flex justify-center items-center flex-col gap-2">

    <section className="relative overflow-hidden flex justify-center items-center">
      <Document
        file={testPdf}
        onLoadSuccess={onDocumentLoadSuccess}
        className="aspect-video w-fit">
        <Page
          pageNumber={pageNumber}
          scale={scale}
          className="relative group"
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu.">
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
            <header className="flex justify-between w-full rounded-md p-2">
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
          </div> */}
        </Page>
      </Document>
    </section>
    //   <footer className="flex items-center gap-2 border-1 rounded-md p-2">
    //     <button onClick={() => setPageNumber((prev) => prev - 1)}>
    //       <ChevronLeftIcon />
    //     </button>
    //     <span>
    //       {pageNumber} / {numPages}
    //     </span>
    //     <button onClick={() => setPageNumber((prev) => prev + 1)}>
    //       <ChevronRightIcon />
    //     </button>
    //   </footer>
    // </section>
  );
}

export default PdfComponent;
