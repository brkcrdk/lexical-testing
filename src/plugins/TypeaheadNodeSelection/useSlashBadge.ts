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
      const slashRegex = /(?:^|\s)\/(?!\/)\S+/g;

      const matches: { text: string; index: number }[] = [];
      let regexMatch;

      while ((regexMatch = slashRegex.exec(text)) !== null) {
        matches.push({
          text: regexMatch[0],
          index: regexMatch.index,
        });
      }

      if (matches.length === 0) return null;

      for (const { text: rawText, index } of matches) {
        const command = rawText.trim().replace(/^\//, "");

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