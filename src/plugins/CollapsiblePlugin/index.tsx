import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { useEffect } from "react";
import { $createCollapsibleTitleNode } from "../../nodes/CollapsibleTitleNode";
import { $createCollapsibleContainerNode } from "../../nodes/CollapsibleContainerNode";
import { $createCollapsibleContentNode } from "../../nodes/CollapsibleContentNode";

// eslint-disable-next-line react-refresh/only-export-components
export const INSERT_COLLAPSIBLE_COMMAND = createCommand<void>(
  "INSERT_COLLAPSIBLE_COMMAND"
);

function CollapsiblePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterInsertCollapsible = editor.registerCommand(
      INSERT_COLLAPSIBLE_COMMAND,
      () => {
          const title = $createCollapsibleTitleNode();
          const paragraph = $createParagraphNode();
          // const collapsibleContainer = $createCollapsibleContainerNode(true);
          // title.append(paragraph);
          // const collapsibleContent = $createCollapsibleContentNode();
          // collapsibleContent.append(paragraph);
          // collapsibleContainer.append(collapsibleContent)
          const collapsibleContainer = $createCollapsibleContainerNode(true).append(
            title.append(paragraph),
            $createCollapsibleContentNode().append($createParagraphNode())
          );
          $insertNodeToNearestRoot(collapsibleContainer);
          // paragraph.select();

        return true
      },
      COMMAND_PRIORITY_EDITOR
    );

    return ()=>{
      unregisterInsertCollapsible();
    }
  }, [editor]);

  return null
}

export default CollapsiblePlugin;