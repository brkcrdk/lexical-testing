import { createContext, use, useMemo, type PropsWithChildren } from "react";
import type { PageMetadata } from "..";
import type { NodeKey } from "lexical";

interface PdfContextType {
  pageMetadata: PageMetadata[];
  nodeKey: NodeKey;
  activePage: number;
  totalPage: number;
  scale: number;
  activePageMetadata: PageMetadata | null;
}

const PdfContext = createContext<PdfContextType | null>(null);

interface Props extends PropsWithChildren{
  pageMetadata: PageMetadata[];
  nodeKey: NodeKey;
  activePage: number;
  totalPage: number;
  scale: number;
}

export const PdfContextProvider = ({
  children,
  pageMetadata,
  nodeKey,
  activePage,
  totalPage,
  scale,
}: Props) => {
  const activePageMetadata = useMemo(() => {
    const metadata = pageMetadata.find(page => page.pageNumber === activePage)
    if(metadata){
      return metadata;
    }
    return null;

  }, [pageMetadata, activePage])

  return (
    <PdfContext.Provider value={{
      pageMetadata,
      nodeKey,
      activePage,
      totalPage,
      scale,
      activePageMetadata,
    }}>
      {children}
    </PdfContext.Provider>
  );
};


export function usePdfContext() {
  const context = use(PdfContext);

  if (!context) {
    throw new Error(
      "usePdfContext must be used within a PdfContext"
    );
  }

  return context;
}
