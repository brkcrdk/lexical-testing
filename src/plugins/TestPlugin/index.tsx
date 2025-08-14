import { DropdownMenu } from 'radix-ui'
import { useState } from 'react';
import useSlashBadge from './useSlashBadge';

function TestPlugin() {
  const [open, setOpen] = useState(false);
 
  useSlashBadge()
  
  return <DropdownMenu.Root open={open} onOpenChange={setOpen}>
    <DropdownMenu.Trigger/>
    <DropdownMenu.Content> 
      <DropdownMenu.Item>x</DropdownMenu.Item>
      <DropdownMenu.Item>2</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
}

export default TestPlugin;