
import { usePdfContext } from "../PdfContext";

function HeaderFooter() {
  const { activePageMetadata } = usePdfContext();

  if(!activePageMetadata){
    return null;
  }

  return (
    <div className="flex justify-between items-center border-t p-2">
      <div className="grid gap-2">
        <strong>{activePageMetadata.pageName}</strong>
        <span>{activePageMetadata.readingTime}dk</span>
      </div>
    </div>
  );
}

export default HeaderFooter;