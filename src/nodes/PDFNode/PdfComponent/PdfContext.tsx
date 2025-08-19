import { createContext, use, useState, type PropsWithChildren } from "react";
import type { PageMetadata } from "..";
import type { NodeKey } from "lexical";
type ScaleChangeType = "increase" | "decrease";

type PageChangeType = "next" | "prev" | { type: "select"; pageNumber: number };

interface PdfContextType {
  pageMetadata: PageMetadata[];
  nodeKey: NodeKey;
  /**
   * @internal
   * Bu veriler component içinde kullanılan stateler ve fonksiyonlardır
  */
  activePage: number;
  totalPage: number;
  scale: number;
  handlePageChange: (type: PageChangeType) => void;
  handleScaleChange: (type: ScaleChangeType) => void;
  setInitialPage: (pageNumber: number) => void;
}

const PdfContext = createContext<PdfContextType | null>(null);

interface Props extends PropsWithChildren{
  pageMetadata: PageMetadata[];
  nodeKey: NodeKey;
}

export const PdfContextProvider = ({
  children,
  pageMetadata,
  nodeKey,
}: Props) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [scale, setScale] = useState(1);

  function handlePageChange(type: PageChangeType) {
    if (type === "next") {
      setActivePage(activePage + 1 > totalPage ? totalPage : activePage + 1);
    } else if (type === "prev") {
      setActivePage(activePage - 1 < 1 ? 1 : activePage - 1);
    } else {
      setActivePage(type.pageNumber);
    }
  }

  function handleScaleChange(type: ScaleChangeType) {
    if (type === "increase") {
      setScale(scale < 2 ? scale + 0.1 : scale);
    } else {
      setScale(scale > 0.5 ? scale - 0.1 : scale);
    }
  }

  function setInitialPage(pageNumber: number) {
    setTotalPage(pageNumber);
  }

  return (
    <PdfContext.Provider value={{
      pageMetadata,
      nodeKey,
      activePage,
      totalPage,
      scale,
      handlePageChange,
      handleScaleChange,
      setInitialPage,
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
