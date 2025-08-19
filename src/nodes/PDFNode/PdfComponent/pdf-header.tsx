import { Edit,File, MoreVertical, ZoomIn, ZoomOut } from "lucide-react";
import { usePdfContext } from "./PdfContext";
import { DropdownMenu } from "radix-ui";

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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="bg-gray-900 rounded-md p-1">
              <MoreVertical />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal >
              <DropdownMenu.Content className="bg-gray-500 p-1 rounded-sm">
                <DropdownMenu.Item className="hover:bg-gray-900">
                  <span>Sayfa 1</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="hover:bg-gray-900">
                  <span>Sayfa 2</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <button onClick={() => handleScaleChange("increase")}>
            <ZoomIn/>
          </button>
          <span>{Math.trunc(scale * 100)}%</span>
          <button onClick={() => handleScaleChange("decrease")}>
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