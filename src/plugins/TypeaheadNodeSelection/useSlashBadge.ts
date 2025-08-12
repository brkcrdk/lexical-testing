import { useCallback, useRef,  } from "react";
import {
  $createSlashBadgeNode,
  SlashBadgeNode,
} from "../../nodes/SlashTextNode";
import { $getSelection, $isRangeSelection, TextNode } from "lexical";
import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";

const FORBIDDEN_PARENT_TYPES = [
  "main-heading",
  'code-block',
  'slash-badge'
];

const expectedWords= ['paragrapgh','heading1', 'text', 'text block']

/**
 * Slash commandında uygun keywordler slash ile birlikte yazınca kullanıcıya belirgin
 * bir şekilde gösterebilmek normal TextNode'u SlashTextNode'una çeviriyoruz.
 */
function useSlashBadge() {
   const $getSlashMatch = useCallback((text: string) => {
     const selection = $getSelection();

     if (!$isRangeSelection(selection)) return null;

     const anchorNode = selection.anchor.getNode();
     const anchorParent = anchorNode.getParent();

     if (!anchorParent) return null;

     if (FORBIDDEN_PARENT_TYPES.includes(anchorParent.getType())) return null;

     const matchArr = /^\/[^/\n]+/.exec(text);

     if (!matchArr) return null;

    const slashWord = matchArr[0].substring(1);
    const hasMatch = expectedWords.some((expected) =>
      expected.toLowerCase().startsWith(slashWord.toLowerCase())
    );

    if (hasMatch) {
      return { start: 0, end: matchArr[0].length, text: matchArr[0] };
    }

     // Slash'ten sonraki karakterleri bul (iki space'e kadar)
     // const match = text.match(/\/[^/\s]*(?:\s[^/\s]*)*/);

     // if(text==='/test'){
     //   console.log('x')
     //   return {
     //     start: 0,
     //     end: 4,
     //   }
     // }

     // if (match) {
     //   return {
     //     start: match.index!,
     //     end: match.index! + match[0].length,
     //     text: match[0]
     //   };
     // }
     // return null;
     return null;
   }, []);

  const $createSlashBadgeNode_ = useCallback((textNode: TextNode): SlashBadgeNode => {
    return $createSlashBadgeNode(textNode.getTextContent());
  }, []);

  useLexicalTextEntity<SlashBadgeNode>(
    $getSlashMatch,
    SlashBadgeNode,
    $createSlashBadgeNode_,
  );
}

export default useSlashBadge;
