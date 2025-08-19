import { MoreVertical } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { usePdfContext } from "../PdfContext";

function PageSelector() {
  const { pageMetadata, handlePageChange, activePage } = usePdfContext();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-gray-900 rounded-md p-1">
        <MoreVertical />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-gray-500 p-1 rounded-sm min-w-40">
          {pageMetadata.map((page) => (
            <DropdownMenu.Item 
                key={page.pageNumber}
                data-active={activePage === page.pageNumber ? '' : undefined}
                className="data-highlighted:bg-gray-600 data-active:bg-gray-400 data-active:rounded-sm p-1 flex justify-between items-center"
                onClick={() => handlePageChange({ type: "select", pageNumber: page.pageNumber })}
              >
              <span>{page.pageName}</span>
              <span className="text-sm text-gray-300">{page.readingTime}dk</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default PageSelector;