import { $getNodeByKey, type NodeKey } from "lexical";
import PdfHeader from "./pdf-header";
import PdfCanvas from "./PdfCanvas";
import { PdfContextProvider } from "./PdfContext";
import PdfFooter from "./PdfFooter";
import PdfUpload from "./PdfUpload";

import { $isPdfNode, type PageMetadata } from "..";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface Props{
  fileUrl?:Base64URLString
  pageMetadata: PageMetadata[]
  nodeKey:NodeKey
  activePage: number
  totalPage: number
  scale: number
}

function PdfComponent({fileUrl, nodeKey, pageMetadata, activePage, totalPage, scale}:Props) {
 const [editor] = useLexicalComposerContext()

  const onSelect = (fileUrl:string) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node && $isPdfNode(node)) {
        node.setFileUrl(fileUrl)
      }
    });
  };
  
  if(!fileUrl){
    return (<PdfUpload onSelect={onSelect} />  );
  }

  return (
    <PdfContextProvider pageMetadata={pageMetadata} nodeKey={nodeKey} activePage={activePage} totalPage={totalPage} scale={scale}>
        <section className="relative grid bg-black overflow-hidden">
          <PdfHeader />
          <PdfCanvas fileUrl={fileUrl} />
          <PdfFooter />
        </section>
    </PdfContextProvider>
  );
}

export default PdfComponent;
