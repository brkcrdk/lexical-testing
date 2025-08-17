import MediaNodeWrapper from "../../components/MediaNodeWrapper";

interface Props {
  hashCode: string;
  /**
   * Yüzdesel bir değer olmalıdır.
   *
   * @defaultValue `50`
   */
  width: number;
  onResize?: (width: number) => void;
}

function CorpeoComponent({ hashCode, width = 50, onResize }: Props) {
  // if (!hashCode) {
  //   return <div>Please select a valid corpeo video</div>;
  // }

  return (
    <MediaNodeWrapper
      width={width}
      onResize={(width) => {
        console.log(width);
      }}>
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
