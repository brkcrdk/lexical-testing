import { EditIcon, XIcon } from 'lucide-react';
import { Dialog } from 'radix-ui'
import type { PageMetadata } from '../..';
import { useState } from 'react';
import { usePdfContext } from '../PdfContext';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey } from 'lexical';
import { $isPdfNode } from '../..';

interface Props{
  activePageMetadata: PageMetadata;
}

function EditPageModal({ activePageMetadata }: Props) {
  const [open, setOpen] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [pageName, setPageName] = useState('');
  const [readingTime, setReadingTime] = useState(-1);

  const {nodeKey, pageMetadata} = usePdfContext();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger onClick={() => {
        setPageName(activePageMetadata.pageName);
        setReadingTime(activePageMetadata.readingTime);
      }}>
        <EditIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md text-black">
          <Dialog.Title className='border-b p-4'>
            {activePageMetadata.pageName} Bilgilerini Düzenle
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Edit the page metadata
          </Dialog.Description>
          <form onSubmit={e=>{
            e.preventDefault();
            const updatedPageMetadata = pageMetadata.map(page => {
              if(page.pageNumber === activePageMetadata.pageNumber){
                return {
                  ...page,
                  pageName: pageName,
                  readingTime: readingTime
                }
              }
              return page;
            });
            
            editor.update(() => {
              const node = $getNodeByKey(nodeKey);
              if (node && $isPdfNode(node)) {
                node.setPageMetadata(updatedPageMetadata);
              }
            });
            setOpen(false);
          }}
           className='flex flex-col gap-2 p-4'
          >
            <label htmlFor="pageName">Sayfa Adı</label>
            <input
              id="pageName"
              value={pageName}  
              onChange={(e) => setPageName(e.target.value)}
              className='border p-2 rounded-md'
            />
            <label htmlFor="readingTime">Okuma Süresi</label>
            <input
              type="number"
              id="readingTime"
              value={readingTime}
              onChange={(e) => setReadingTime(Number(e.target.value))}
              className='border p-2 rounded-md'
            />
            <button
              className='bg-blue-500 text-white p-2 rounded-md'
              >
              Kaydet
            </button>
            <Dialog.Close className='flex items-center gap-2 bg-gray-200 p-2 rounded-md justify-center'>
              <XIcon />
              Iptal
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditPageModal;