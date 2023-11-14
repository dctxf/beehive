import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  str: z.string(),
  paddle: z.boolean().optional(),
  cutAll: z.boolean().optional(),
});

const queryJieba = ({
  str,
  paddle,
  cutAll,
}: {
  str: string;
  paddle?: boolean;
  cutAll?: boolean;
}) => {
  return fetch(
    `https://ims-api.dctxf.com/jieba?str=${str}&paddle=${paddle}&cut_all=${cutAll}`
  ).then((res) => res.json());
};

export default () => {
  const { data, run } = useRequest(queryJieba, { manual: true });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      str: '这里采用的是jieba分词',
      paddle: true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    run(values);
  }

  return (
    <div className='p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='str'
            render={({ field }) => (
              <FormItem>
                <FormLabel>将要分词的内容</FormLabel>
                <FormControl>
                  <Textarea placeholder='请输入你要分词的内容' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {data && (
            <FormItem>
              <FormLabel>分词结果</FormLabel>
              <Alert>
                <AlertDescription>
                  {data?.list.map((i: string) => {
                    return (
                      <Badge key={i} variant='outline'>
                        {i}
                      </Badge>
                    );
                  })}
                </AlertDescription>
              </Alert>
            </FormItem>
          )}
          <FormField
            control={form.control}
            name='paddle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paddle Mode</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cutAll'
            render={({ field }) => (
              <FormItem>
                <FormLabel>精准模式</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>提交</Button>
        </form>
      </Form>
    </div>
  );
};
