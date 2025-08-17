import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef, type HTMLAttributes } from "react";
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import type { ElementFormatType, NodeKey } from "lexical";

interface Props extends HTMLAttributes<HTMLDivElement> {
  format: ElementFormatType;
  nodeKey: NodeKey;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem 
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({children, className, format, nodeKey}: Props) {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement>(null);

  const editorRootElement = editor.getRootElement();

  return (
    <BlockWithAlignableContents
      className={{
        base: "relative border-2 border-red-500",
        focus: "focus:outline-none"
      }}
      format={format}
      nodeKey={nodeKey}
    >
      <div ref={ref} className={`relative ${className}`}>
        {children}
      </div>
    </BlockWithAlignableContents>
  );
}

export default MediaNodeWrapper;