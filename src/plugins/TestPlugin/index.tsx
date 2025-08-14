import { useEffect, useState } from 'react';
import useSlashBadge from './useSlashBadge';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isSlashBadgeNode } from '../../nodes/SlashTextNode';
import { autoUpdate, offset, useFloating } from '@floating-ui/react';
import { $getSelection, $isRangeSelection } from 'lexical';

function TestPlugin() {
  const [editor] = useLexicalComposerContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: anchorEl,
    },
    placement: "bottom-start",
    middleware: [offset(4)],
    whileElementsMounted: autoUpdate,
  });

  useSlashBadge();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const node = selection.anchor.getNode();
        if ($isSlashBadgeNode(node)) {
          const nodeKey = node.getKey();
          const dom = editor.getElementByKey(nodeKey);

          setAnchorEl(dom || null);
        } else {
          setAnchorEl(null);
        }
      });
    });
  }, [editor]);


  return anchorEl ? (
    <ul 
      ref={refs.setFloating} style={floatingStyles}
      className='bg-white rounded-md p-2'
    >
      <li className='text-black p-2'>Blueberry</li>
      <li className='text-black p-2'>Blue Whale</li>
      <li className='text-black p-2'>Blue Sky</li>
    </ul>
  ) : null;
}

export default TestPlugin;