import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePdfContext } from "./PdfContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { $isPdfNode } from "..";

function PdfFooter() {
  const { activePage, totalPage, nodeKey } = usePdfContext();
  const [editor] = useLexicalComposerContext();

  return <footer className="flex justify-between items-center border rounded-b-sm p-2">
      <button
        disabled={activePage === 1}
        className="flex items-center gap-2 p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={() => {
          editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node && $isPdfNode(node)) {
              node.handleGoPrevPage();
            }
          });
        }}
      >
        <ChevronLeftIcon />
        Önceki Sayfa
      </button>
    <div>

    <span>{activePage}/{totalPage}</span>

    </div>
      <button
        disabled={activePage === totalPage}
        className="flex items-center gap-2 p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={() => {
          editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node && $isPdfNode(node)) {
              node.handleGoNextPage();
            }
          });
        }}
      >
        Sonraki Sayfa
        <ChevronRightIcon />
      </button>
  </footer>;
}

export default PdfFooter;