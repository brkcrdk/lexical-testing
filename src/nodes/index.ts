import { ParagraphNode } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { MainHeadingNode } from "./MainHeadingNode";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  $createCustomParagraphNode,
  CustomParagraphNode,
} from "./CustomParagraphNode";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import {
  $createCustomHeadingNode,
  CustomHeadingNode,
} from "./CustomHeadingNode";

const nodes: InitialConfigType["nodes"] = [
  CustomHeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  {
    replace: HeadingNode,
    with: (val) => $createCustomHeadingNode(val),
    withKlass: CustomHeadingNode,
  },
  MainHeadingNode,
  CustomParagraphNode,
  {
    replace: ParagraphNode,
    with: () => $createCustomParagraphNode(),
    withKlass: CustomParagraphNode,
  },
];

export default nodes;
