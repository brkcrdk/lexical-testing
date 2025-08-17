import MediaNodeWrapper from "../../components/MediaNodeWrapper";

interface Props {
  hashCode: string;
}

function CorpeoComponent({ hashCode }: Props) {
  // if (!hashCode) {
  //   return <div>Please select a valid corpeo video</div>;
  // }

  return (
    <MediaNodeWrapper>
      <iframe
        src="http://localhost:3000/v2/embed/93e81b36-512"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </MediaNodeWrapper>
  );
}

export default CorpeoComponent;
