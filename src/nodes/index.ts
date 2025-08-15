import { ParagraphNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { MainHeadingNode } from "./MainHeadingNode";
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
  // HeadingNode,
  {
    replace: HeadingNode,
    with: () => $createCustomHeadingNode(),
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
