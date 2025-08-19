import { createContext, use, useState, type PropsWithChildren } from "react";
type ScaleChangeType = "increase" | "decrease";
type PageChangeType = "next" | "prev";

interface PdfContextType {
  activePage: number;
  totalPage: number;
  scale: number;
  handlePageChange: (type: PageChangeType) => void;
  handleScaleChange: (type: ScaleChangeType) => void;
  setInitialPage: (pageNumber: number) => void;
}

const PdfContext = createContext<PdfContextType | null>(null);

export const PdfContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [scale, setScale] = useState(1);

  function handlePageChange(type: PageChangeType) {
    if (type === "next") {
      setActivePage(activePage + 1 > totalPage ? totalPage : activePage + 1);
    } else {
      setActivePage(activePage - 1 < 1 ? 1 : activePage - 1);
    }
  }

  function handleScaleChange(type: ScaleChangeType) {
    if (type === "increase") {
      setScale(scale + 0.1);
    } else {
      setScale(scale - 0.1);
    }
  }

  function setInitialPage(pageNumber: number) {
    setTotalPage(pageNumber);
  }

  return (
    <PdfContext.Provider value={{
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
