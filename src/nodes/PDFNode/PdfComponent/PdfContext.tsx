import { createContext, use, type PropsWithChildren } from "react";

const PdfContext = createContext(null);

export const PdfContextProvider = ({
  children,
}: PropsWithChildren) => {


  return (
    <PdfContext.Provider value={null}>
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
