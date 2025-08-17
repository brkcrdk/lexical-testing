import type { ElementFormatType, NodeKey } from "lexical";
import MediaNodeWrapper from "../../components/MediaNodeWrapper";

interface Props {
  hashCode: string;
  format: ElementFormatType;
  nodeKey: NodeKey;
}

function CorpeoComponent({ hashCode, format, nodeKey }: Props) {
  // if (!hashCode) {
  //   return <div>Please select a valid corpeo video</div>;
  // }

  return (
    <MediaNodeWrapper format={format} nodeKey={nodeKey}>
      <iframe
        className="aspect-auto"
        src="http://localhost:3000/v2/embed/93e81b36-512"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </MediaNodeWrapper>
  );
}

export default CorpeoComponent;
