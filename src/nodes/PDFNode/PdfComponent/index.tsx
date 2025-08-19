import PdfHeader from "./pdf-header";
import PdfCanvas from "./PdfCanvas";
import PdfFooter from "./PdfFooter";

function PdfComponent() {
  return (
      <section className="relative grid bg-black overflow-hidden">
        <PdfHeader />
        <PdfCanvas />
        <PdfFooter />
      </section>
  );
}

export default PdfComponent;
