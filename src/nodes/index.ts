import { ParagraphNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { MainHeadingNode } from "./MainHeadingNode";
import {
  $createCustomParagraphNode,
  CustomParagraphNode,
} from "./CustomParagraphNode";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";

const nodes: InitialConfigType["nodes"] = [
  HeadingNode,
  MainHeadingNode,
  CustomParagraphNode,
  {
    replace: ParagraphNode,
    with: () => $createCustomParagraphNode(),
    withKlass: CustomParagraphNode,
  },
];

export default nodes;
