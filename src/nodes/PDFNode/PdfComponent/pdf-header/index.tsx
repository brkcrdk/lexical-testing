import { File, ZoomIn, ZoomOut } from "lucide-react";
import { usePdfContext } from "../PdfContext";  
import PageSelector from "./PageSelector";
import HeaderFooter from "./HeaderFooter";

function PdfHeader() {
  const { scale, handleScaleChange } = usePdfContext();
  return (
    <header className="flex flex-col gap-2 border rounded-t-sm">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <File />
          <h3>File Name</h3>
        </div>
        <div className="flex items-center gap-2">
          <PageSelector />
          <button onClick={() => handleScaleChange("increase")}>
            <ZoomIn />
          </button>
          <span>{Math.trunc(scale * 100)}%</span>
          <button onClick={() => handleScaleChange("decrease")}>
            <ZoomOut />
          </button>
        </div>
      </div>
      <HeaderFooter />
    </header>
  );
}

export default PdfHeader;
