import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// import testPdf from "./test.pdf";
import testPdf from "./test2.pdf";
import MediaNodeWrapper from "../../components/MediaNodeWrapper";

function PdfComponent() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="relativeoverflow-hidden">
      <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess}  className='aspect-video w-fit'>
        <Page
          pageNumber={pageNumber}
          scale={1}
          className="border-1 border-dashed border-blue-600"
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu."
        />
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
      <footer>
            <button></button>

      </footer>
    </div>
  );
}

export default PdfComponent;
