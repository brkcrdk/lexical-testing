import { $getNodeByKey, type NodeKey } from "lexical";
import PdfHeader from "./pdf-header";
import PdfCanvas from "./PdfCanvas";
import { PdfContextProvider } from "./PdfContext";
import PdfFooter from "./PdfFooter";
import PdfUpload from "./PdfUpload";

import { $isPdfNode } from "..";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface Props{
  fileUrl?:Base64URLString
  nodeKey:NodeKey
}

function PdfComponent({fileUrl,nodeKey}:Props) {
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
    <PdfContextProvider>
        <section className="relative grid bg-black overflow-hidden">
          <PdfHeader />
          <PdfCanvas fileUrl={fileUrl} />
          <PdfFooter />
        </section>
    </PdfContextProvider>
  );
}

export default PdfComponent;
