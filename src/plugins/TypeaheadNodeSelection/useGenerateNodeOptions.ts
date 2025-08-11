import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { useMemo } from "react";

interface NodeOptionProps {
  nodeName: string;
  title: string;
  triggerPattern: string;
  description: {
    descriptionHeroImage: string;
    caption: string;
  };
}

export class CustomNodeOption extends MenuOption {
  __nodeOption: NodeOptionProps;
  constructor(key: string, nodeOption: NodeOptionProps) {
    super(key);
    this.__nodeOption = nodeOption;
  }
}

const nodeOptions = [
  new CustomNodeOption("p", {
    nodeName: "p",
    title: "Text",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a text",
    },
  }),
  new CustomNodeOption("h1", {
    nodeName: "h1",
    title: "Heading 1",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 1",
    },
  }),
  new CustomNodeOption("h2", {
    nodeName: "h2",
    title: "Heading 2",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 2",
    },
  }),
  new CustomNodeOption("h3", {
    nodeName: "h3",
    title: "Heading 3",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 3",
    },
  }),
  new CustomNodeOption("h4", {
    nodeName: "h4",
    title: "Heading 4",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 4",
    },
  }),
  new CustomNodeOption("h5", {
    nodeName: "h5",
    title: "Heading 5",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 5",
    },
  }),
  new CustomNodeOption("h6", {
    nodeName: "h6",
    title: "Heading 6",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a heading 6",
    },
  }),
  new CustomNodeOption("ul", {
    nodeName: "ul",
    title: "Unordered List",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a unordered list",
    },
  }),
  new CustomNodeOption("ol", {
    nodeName: "ol",
    title: "Ordered List",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a ordered list",
    },
  }),
  new CustomNodeOption("blockquote", {
    nodeName: "blockquote",
    title: "Blockquote",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a blockquote",
    },
  }),
  new CustomNodeOption("callout", {
    nodeName: "callout",
    title: "Callout",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a callout",
    },
  }),
  new CustomNodeOption("divider", {
    nodeName: "divider",
    title: "Divider",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a divider",
    },
  }),
  new CustomNodeOption("callout", {
    nodeName: "callout",
    title: "Callout",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a callout",
    },
  }),
  new CustomNodeOption("toggle-list", {
    nodeName: "toggle-list",
    title: "Toggle List",
    triggerPattern: "/",
    description: {
      descriptionHeroImage: "https://via.placeholder.com/150",
      caption: "This is a toggle list",
    },
  }),
];

function useNodeOptions(queryString:string|null):CustomNodeOption[] {

  const filteredOptions = useMemo(() => {
    return nodeOptions.filter((option) => {
      return option.__nodeOption.nodeName
        .toLowerCase()
        .includes(queryString?.toLowerCase() || "");
    });
  }, [queryString]);

  return filteredOptions;
}


export default useNodeOptions;