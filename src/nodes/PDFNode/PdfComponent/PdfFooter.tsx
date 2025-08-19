import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePdfContext } from "./PdfContext";

function PdfFooter() {
  const { activePage, totalPage, handlePageChange } = usePdfContext();
  return <footer className="flex justify-between items-center border rounded-b-sm p-2">
      <button
        disabled={activePage === 1}
        className="flex items-center gap-2 p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={() => handlePageChange("prev")}
      >
        Önceki Sayfa
        <ChevronLeftIcon />
      </button>
    <div>

    <span>{activePage}/{totalPage}</span>

    </div>
      <button
        disabled={activePage === totalPage}
        className="flex items-center gap-2 p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={() => handlePageChange("next")}
      >
        Sonraki Sayfa
        <ChevronRightIcon />
      </button>
  </footer>;
}

export default PdfFooter;