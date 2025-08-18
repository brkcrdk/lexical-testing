import MediaNodeWrapper, {
  type AlignTypes,
} from "../../components/MediaNodeWrapper";
import { Dialog } from "radix-ui";
import { MonitorPlay, XIcon } from "lucide-react";
import videoList from "./videoList";
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
  onSelect?: (hashCode: string) => void;
}

function CorpeoComponent({
  hashCode,
  width = 50,
  onResize,
  align = "start",
  onAlignChange,
  onSelect,
}: Props) {
  if (!hashCode) {
    return (
      <Dialog.Root defaultOpen>
        <Dialog.Trigger className="size-full h-6 rounded-md border-1 border-gray-400 flex items-center gap-2 py-8 px-4">
          <MonitorPlay className="size-4" />
          Corpeo videosu seç
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <Dialog.Content className="fixed inset-0 flex flex-col items-center m-auto bg-black/80 justify-center shadow-sm border-1 h-fit border-gray-400 rounded-md w-[90%] md:max-w-200 max-h-[80vh]">
            <header className="flex items-center justify-between w-full border-b-1 border-gray-400 p-4">
              <Dialog.Title className="text-lg">
                Corpeo Videosu Seç
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                Corpeo videosu seç
              </Dialog.Description>
              <Dialog.Close>
                <XIcon className="size-4" />
              </Dialog.Close>
            </header>
            <ul className="grid w-full p-4 gap-4">
              {videoList.map((video) => (
                <li
                  className="!list-none flex items-center justify-between hover:bg-gray-900 rounded-md p-2"
                  key={video.id}>
                  <div className="flex items-center gap-4">
                    <img
                      className="aspect-video w-30 rounded-md object-cover bg-black"
                      src={video.coverImage}
                      alt={video.title}
                    />
                    <span>{video.title}</span>
                  </div>
                  <button
                    className="justify-self-end bg-green-700 rounded p-1 px-2"
                    onClick={() => {
                      if (onSelect) {
                        onSelect(video.hashCode);
                      }
                    }}>
                    Seç
                  </button>
                </li>
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <MediaNodeWrapper
      initialWidth={width}
      onResize={onResize}
      align={align}
      onAlignChange={onAlignChange}>
      <iframe
        src={`https://corpeo.90pixel.net/v2/embed/${hashCode}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </MediaNodeWrapper>
  );
}

export default CorpeoComponent;
