import MediaNodeWrapper from "../../components/MediaNodeWrapper";

interface Props {
  hashCode: string;
  /**
   * Yüzdesel bir değer olmalıdır.
   *
   * @defaultValue `50`
   */
  width: number;
}

function CorpeoComponent({ hashCode, width = 50 }: Props) {
  // if (!hashCode) {
  //   return <div>Please select a valid corpeo video</div>;
  // }

  function handleResize(width: number) {
    console.log("width", width);
  }

  return (
    <MediaNodeWrapper width={width} onResize={handleResize}>
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
