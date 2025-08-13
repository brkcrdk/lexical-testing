import { useCallback, useEffect, useRef } from "react";
import {
  $createSlashBadgeNode,
  SlashBadgeNode,
} from "../../nodes/SlashTextNode";
import { $getSelection, $isRangeSelection, TextNode } from "lexical";
import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const FORBIDDEN_PARENT_TYPES = ["main-heading", "code-block", "slash-badge"];

// Sadece bu kelimelerle slash badge oluşturulacak
const allowedWords = ["test", "text", "heading", "paragraph"];

/**
 * Slash commandında uygun keywordler slash ile birlikte yazınca kullanıcıya belirgin
 * bir şekilde gösterebilmek normal TextNode'u SlashTextNode'una çeviriyoruz.
 */
function useSlashBadge() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterTransform = editor.registerNodeTransform(
      TextNode,
      (node) => {
        const text = node.getTextContent();
        const matches = text.match(/(?:^|\s)\/(?!\/)\S+/g);

        if (matches) {
          console.log(matches);
          // for(const match of matches){
          //   console.log(match)
          // }
        }
      }
    );

    return () => {
      unregisterTransform();
    };
  }, [editor]);
}

export default useSlashBadge;
