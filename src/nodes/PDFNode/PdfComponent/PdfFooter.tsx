import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function PdfFooter() {
  return <footer className="flex justify-between items-center border rounded-b-sm p-2">
      <button className="flex items-center gap-2 p-2">
        Önceki Sayfa
        <ChevronLeftIcon />
      </button>
    <div>

    <span>1/10</span>

    </div>
      <button className="flex items-center gap-2 p-2">
        Sonraki Sayfa
        <ChevronRightIcon />
      </button>
  </footer>;
}

export default PdfFooter;