import { useCallback,  } from "react";
import {
  $createSlashBadgeNode,
  SlashBadgeNode,
} from "../../nodes/SlashTextNode";
import { TextNode } from "lexical";
import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";

function useFocusNode() {
  //  const $getSlashMatch = useCallback((text: string) => {
  //   // Slash'ten sonraki karakterleri bul (iki space'e kadar)
  //   const match = text.match(/\/[^/\s]*(?:\s[^/\s]*)*/);
    
  //   if (match) {
  //     return {
  //       start: match.index!,
  //       end: match.index! + match[0].length,
  //       text: match[0]
  //     };
  //   }
  //   return null;
  // }, []);

  // const $createSlashBadgeNode_ = useCallback((textNode: TextNode): SlashBadgeNode => {
  //   return $createSlashBadgeNode(textNode.getTextContent());
  // }, []);

  // useLexicalTextEntity<SlashBadgeNode>(
  //   $getSlashMatch,
  //   SlashBadgeNode,
  //   $createSlashBadgeNode_,
  // );
  return null
}

export default useFocusNode;
