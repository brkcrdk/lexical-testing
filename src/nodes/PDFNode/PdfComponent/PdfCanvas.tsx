import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { usePdfContext } from "./PdfContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { $isPdfNode } from "..";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props{
  fileUrl:string
}

function PdfCanvas({ fileUrl }:Props) {
  const [editor] = useLexicalComposerContext();
  const { activePage, scale, nodeKey } = usePdfContext();
 
  return (
    <div className="relative overflow-hidden p-2 justify-center items-center flex">
      <Document file={fileUrl} onLoadSuccess={({ numPages, }) => {
        const pageMetadata = Array.from({ length: numPages }, (_, index) => ({
          pageNumber: index + 1,
          pageName: `Sayfa ${index + 1}`,
          readingTime: 5,
        }));
        
        
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if (node && $isPdfNode(node)) {
            node.setPageMetadata(pageMetadata);
            node.setTotalPage(numPages);
          }
        });

      }}>
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