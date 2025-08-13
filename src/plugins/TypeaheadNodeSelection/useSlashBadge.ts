/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { TextNode } from "lexical";


import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";
import { useCallback,  } from "react";
import { $createSlashBadgeNode, SlashBadgeNode } from "../../nodes/SlashTextNode";

const allowedWords = ['test', 'text', 'heading', 'paragraph']

 function useSlashBadge(){
   const $createSlashBadgeNode_ = useCallback(
     (textNode: TextNode): SlashBadgeNode => {
       return $createSlashBadgeNode(textNode.getTextContent());
     },
     []
   );

  const getHashtagMatch = useCallback((text: string) => {
    const slashRegex = /(?:^|\s)\/(?!\/)\S*/g;

    for (const match of text.matchAll(slashRegex)) {
      const rawText = match[0];
      const index = match.index ?? 0;

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
     getHashtagMatch,
     SlashBadgeNode,
     $createSlashBadgeNode_
   );
 }
export default useSlashBadge;