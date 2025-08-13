import { ParagraphNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { MainHeadingNode } from "./MainHeadingNode";
import {
  $createCustomParagraphNode,
  CustomParagraphNode,
} from "./CustomParagraphNode";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { SlashBadgeNode } from "./SlashTextNode";

const nodes: InitialConfigType["nodes"] = [
  HeadingNode,
  MainHeadingNode,
  SlashBadgeNode,
  CustomParagraphNode,
  {
    replace: ParagraphNode,
    with: () => $createCustomParagraphNode(),
    withKlass: CustomParagraphNode,
  },
];

export default nodes;
