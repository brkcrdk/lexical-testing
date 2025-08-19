import PdfHeader from "./pdf-header";
import PdfCanvas from "./PdfCanvas";
import { PdfContextProvider } from "./PdfContext";
import PdfFooter from "./PdfFooter";

function PdfComponent() {
  return (
    <PdfContextProvider>
      <section className="relative grid bg-black overflow-hidden">
        <PdfHeader />
        <PdfCanvas />
        <PdfFooter />
      </section>
    </PdfContextProvider>
  );
}

export default PdfComponent;
