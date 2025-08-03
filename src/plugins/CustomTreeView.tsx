import { TreeView } from "@lexical/react/LexicalTreeView";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function CustomTreeView() {
  const [editor] = useLexicalComposerContext();
  
  return <TreeView editor={editor} />; 
}

export default CustomTreeView;