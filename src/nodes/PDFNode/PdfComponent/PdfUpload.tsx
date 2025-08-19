import { FileText } from "lucide-react";
import UploadProvider from "../../../components/UploadProvider";
import { mediaFileReader } from "@lexical/utils";

function PdfUpload() {
  return (
    <UploadProvider
      accept=".pdf"
      multiple={false}
      onChange={async (file) => {
         const filesResult = await mediaFileReader(
           [file],
           ["application/pdf"]
         );

         console.log(filesResult)
      }}
      rootProps={{
        className: "data-hovering:bg-red-500",
      }}>
      <div className="flex flex-col items-center justify-center gap-2 border rounded-md p-4">
        <FileText size={24} />
        <p>PDF yüklemek için tıklayın</p>
      </div>
    </UploadProvider>
  );
}

export default PdfUpload;