import { FormControl, FormItem, FormLabel } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export type FormRadioGroupProps = {
  value?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
};

export function FormRadioGroup({
  onChange,
  value,
  options,
}: FormRadioGroupProps) {
  return (
    <RadioGroup
      onValueChange={onChange}
      value={value}
      className='flex space-x-3'
    >
      {options?.map((i) => {
        return (
          <FormItem
            key={i.value}
            className='flex items-center space-x-3 space-y-0'
          >
            <FormControl>
              <RadioGroupItem value={i.value} />
            </FormControl>
            <FormLabel className='font-normal'>{i.label}</FormLabel>
          </FormItem>
        );
      })}
    </RadioGroup>
  );
}
