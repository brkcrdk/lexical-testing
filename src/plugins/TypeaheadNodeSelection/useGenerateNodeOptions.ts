import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import type { HeadingTagType } from "@lexical/rich-text";
import { useMemo } from "react";

type NodeOptionProps =
  | {
      type:'default'
      nodeName: string;
      title: string;
      triggerPattern: string;
    }
  | {
      type: 'heading';
      nodeName: 'heading';
      headingLevel: HeadingTagType
      title: string;
      triggerPattern: string;
    } | 
    {
      type: 'list';
      nodeName: 'list';
      title: string;
      listType: 'ordered' | 'unordered';
      triggerPattern: string;
    }

export class CustomNodeOption extends MenuOption {
  __nodeOption: NodeOptionProps;
  constructor(key: string, nodeOption: NodeOptionProps) {
    super(key);
    this.__nodeOption = nodeOption;
  }
}

const nodeOptions = [
  new CustomNodeOption("text", {
    type: 'default',
    nodeName: "text",
    title: "Text",
    triggerPattern: "",
  }),
  new CustomNodeOption("h1", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h1",
    title: "Heading 1",
    triggerPattern: "#",
  }),
  new CustomNodeOption("h2", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h2",
    title: "Heading 2",
    triggerPattern: "##",
  }),
  new CustomNodeOption("h3", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h3",
    title: "Heading 3",
    triggerPattern: "###",
  }),
  new CustomNodeOption("h4", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h4",
    title: "Heading 4",
    triggerPattern: "####",
  }),
  new CustomNodeOption("h5", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h5",
    title: "Heading 5",
    triggerPattern: "#####",
  }),
  new CustomNodeOption("h6", {
    type: 'heading',
    nodeName: "heading",
    headingLevel: "h6",
    title: "Heading 6",
    triggerPattern: "######",
  }),
  new CustomNodeOption("ul", {
    type: 'list',
    nodeName: "list",
    listType: 'unordered',
    title: "Unordered List",
    triggerPattern: "*",
  }),
  new CustomNodeOption("ol", {
    type: 'list',
    nodeName: "list",
    listType: 'ordered',
    title: "Ordered List",
    triggerPattern: "1.",
  }),
  new CustomNodeOption("quote", {
    type: 'default',
    nodeName: "quote",
    title: "Quote",
    triggerPattern: ">",
  }),
  new CustomNodeOption("divider", {
    type: 'default',
    nodeName: "divider",
    title: "Divider",
    triggerPattern: "---",
  }),
  new CustomNodeOption("toggle-list", {
    type: 'default',
    nodeName: "toggle-list",
    title: "Toggle List",
    triggerPattern: "",
  }),
  new CustomNodeOption("corpeo", {
    type: 'default',
    nodeName: "corpeo",
    title: "Corpeo",
    triggerPattern: "",
  }),
];

function useNodeOptions(queryString:string|null):CustomNodeOption[] {
  const filteredOptions = useMemo(() => {

    if(!queryString) return nodeOptions;

    const query = queryString.toLowerCase();
    return nodeOptions.filter((option) => {
      const nodeNameLower = option.__nodeOption.nodeName.toLowerCase();
      const titleLower = option.__nodeOption.title.toLowerCase();
      return nodeNameLower.includes(query) || titleLower.includes(query);
    });
  }, [queryString]);

  return filteredOptions;
}


export default useNodeOptions;