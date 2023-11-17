import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export type CommandPopoverProps = {
  value?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

export const CommandPopover = function ({
  value,
  options,
  onChange,
  placeholder = '请选择...',
}: CommandPopoverProps) {
  const [open, setOpen] = useState(false);

  const label = options?.find((i) => i.value === value)?.label;
  const showLabel = (label?.length || 0) > 10 ? label : label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between '
        >
          <span className='line-clamp-1'>
            {value ? showLabel : placeholder}
          </span>

          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder='请输入您要搜索的内容...' />
          <CommandEmpty>很遗憾，没有找到</CommandEmpty>
          <CommandGroup className='h-[300px] overflow-auto'>
            {options?.map((i) => (
              <CommandItem
                key={i.value}
                onSelect={() => {
                  onChange?.(i.value);
                  setOpen(false);
                }}
              >
                <div className='flex items-center'>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === i.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className='flex-1'>{i.label}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
