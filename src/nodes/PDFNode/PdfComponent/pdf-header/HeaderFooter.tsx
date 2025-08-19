
import { usePdfContext } from "../PdfContext";
import EditPageModal from "./EditPageModal";

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
      <EditPageModal activePageMetadata={activePageMetadata} />
    </div>
  );
}

export default HeaderFooter;