import PdfHeader from "./pdf-header";
import PdfCanvas from "./PdfCanvas";
import { PdfContextProvider } from "./PdfContext";
import PdfFooter from "./PdfFooter";

interface Props{
  fileUrl?:Base64URLString
}

function PdfComponent({fileUrl}:Props) {
  if(!fileUrl){
    return <div>PDF dosyası yüklemek için tıklayınız.</div>
  }
  return (
    <PdfContextProvider>
        <section className="relative grid bg-black overflow-hidden">
          <PdfHeader />
          <PdfCanvas fileUrl={fileUrl} />
          <PdfFooter />
        </section>
    </PdfContextProvider>
  );
}

export default PdfComponent;
