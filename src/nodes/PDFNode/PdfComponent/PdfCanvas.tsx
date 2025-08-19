import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { usePdfContext } from "./PdfContext";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;


interface Props{
  fileUrl:string
}

function PdfCanvas({ fileUrl }:Props) {
  const { activePage, scale, setInitialPage } = usePdfContext();
 
  return (
    <div className="relative overflow-hidden p-2 justify-center items-center flex">
      <Document file={fileUrl} onLoadSuccess={({ numPages }) => setInitialPage(numPages)}>
        <Page
          pageNumber={activePage}
          scale={scale}
          className="relative group"
          loading="Sayfa yükleniyor..."
          error="Sayfa yüklenirken hata oluştu."
        />
      </Document>
    </div>
  );
}
export default PdfCanvas