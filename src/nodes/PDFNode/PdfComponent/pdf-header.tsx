import { Edit,File, ZoomIn, ZoomOut } from "lucide-react";

function PdfHeader() {
  return (
    <header className="flex flex-col gap-2 border rounded-t-sm">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <File />
          <h3>File Name</h3>
        </div>
        <div className="flex items-center gap-2">
          <button>
            <Edit />
          </button>
          <button>
            <ZoomIn/>
          </button>
          <span>100%</span>
          <button>
            <ZoomOut/>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center border-t p-2">
        <div className="grid gap-2">
          <strong>Sayfa 1</strong>
          <span>Okuma Süresi: 5dk</span>
        </div>
        <button>
          <Edit />
        </button>
      </div>
    </header>
  );
}

export default PdfHeader;