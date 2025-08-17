import MediaNodeWrapper, {
  type AlignTypes,
} from "../../components/MediaNodeWrapper";

interface Props {
  hashCode: string;
  /**
   * Yüzdesel bir değer olmalıdır.
   *
   * @defaultValue `50`
   */
  width: number;
  align?: AlignTypes;
  onResize?: (width: number) => void;
  onAlignChange?: (align: AlignTypes) => void;
}

function CorpeoComponent({
  hashCode,
  width = 50,
  onResize,
  align = "start",
  onAlignChange,
}: Props) {
  // if (!hashCode) {
  //   return <div>Please select a valid corpeo video</div>;
  // }

  return (
    <MediaNodeWrapper
      initialWidth={width}
      onResize={onResize}
      align={align}
      onAlignChange={onAlignChange}>
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
