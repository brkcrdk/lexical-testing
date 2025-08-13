import { $getSelection, $isRangeSelection, type TextNode } from "lexical";

import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";
import { useCallback,  } from "react";
import { $createSlashBadgeNode, SlashBadgeNode } from "../../nodes/SlashTextNode";

const blockedNodeTypes =['main-heading']

const allowedWords = ['test', 'text', 'heading', 'paragraph']

/**
 * @description
 * Metinler içinde slash yazıldığında typeahead nodunda yazılan filtrelemeyi textten badge şeklinde döndüren hooktur.
 * Bu hook sayesinde filtrede yazılan arama değeri normal text dışında render edilebilir hale getirilir. Bu hook
 * sayesinde her slash ile başlayan textler typeaheadle ilişkili gibi görünemeyecektir.
 */
 function useSlashBadge(){
   const $createSlashBadgeNode_ = useCallback(
     (textNode: TextNode): SlashBadgeNode => {
       return $createSlashBadgeNode(textNode.getTextContent());
     },
     []
   );

   /**
    * @description
    * Metin içinde `/` ile başlayan ve `//` ile başlamayan komut benzeri ifadeleri arar.
    * Eşleşme bulunduğunda, izin verilen kelimeler (`allowedWords`) listesinde yer alıp almadığını kontrol eder.
    * İlk geçerli eşleşmenin başlangıç ve bitiş indexlerini döner, aksi halde `null` döner.
    *
    * @example
    * const allowedWords = ["komut", "deneme"];
    * getHashtagMatch("/komut çalışıyor") ve bu text slash-badge nodeuna dönüşüyor.
    * // → { start: 0, end: 6 }
    *
    * getHashtagMatch("bu bir //yorum satırı");
    * // → null (çünkü // ile başlıyor)
    *
    * getHashtagMatch("/bilinmeyen");
    * // → null (çünkü allowedWords içinde yok)
    */
   const $getHashtagMatch = useCallback((text: string) => {
     const selection = $getSelection();

     if (!$isRangeSelection(selection)) return null;

     const anchorNode = selection.anchor.getNode();
     const parentNode = anchorNode.getParent();

     if (!parentNode) return null;

     const isBlockedNode = blockedNodeTypes.includes(parentNode.getType());

     if (isBlockedNode) return null;

     const slashRegex = /(?:^|\s)\/(?!\/)\S*/g;
     const allMatches = text.matchAll(slashRegex);

     for (const match of allMatches) {
       const rawText = match[0];
       const index = match.index;

       // Başındaki boşlukları ve ilk slash'i kaldır
       const command = rawText.trim().replace(/^\//, "");

       // İzinli kelimelerden biriyle eşleşiyorsa hemen dön
       const isAllowed = allowedWords.some((word) =>
         word.toLowerCase().includes(command.toLowerCase())
       );

       if (isAllowed) {
         return {
           start: index,
           end: index + rawText.length,
         };
       }
     }

     return null;
   }, []);

   useLexicalTextEntity<SlashBadgeNode>(
     $getHashtagMatch,
     SlashBadgeNode,
     $createSlashBadgeNode_
   );
 }
export default useSlashBadge;