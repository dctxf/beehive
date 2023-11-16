import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  phone: z.string().regex(/^[1]\d{10}$/),
});

const queryPhoneLocation = ({ phone }: { phone: string }) => {
  return fetch(`https://ims-api.dctxf.com/phone/location?phone=${phone}`).then(
    (res) => res.json()
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AMap = (window as any).AMap;

export default () => {
  const { data, run } = useRequest(queryPhoneLocation, { manual: true });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    run(values);
  }

  const mapRef = useRef(null);

  // 绘制地图
  useEffect(() => {
    if (mapRef.current && data?.cityCenter) {
      new AMap.Map('container', {
        // zoom: 3, //级别
        center: data.cityCenter.split(','), //中心点坐标
        viewMode: '3D', //使用3D视图
        mapStyle: 'amap://styles/blue',
      });
      // const distWorld = new AMap.DistrictLayer.World({
      //   // adcode: data.adcode,
      //   zIndex: 10, // 设置图层层级
      //   zooms: [2, 15], // 设置图层显示范围
      // });
      // distWorld.setStyles({
      //   'stroke-width': 2, // 设置描边颜色
      //   fill: function () {
      //     // 设置区域填充颜色，可根据回调信息返回区域信息设置不同填充色
      //     // 回调返回区域信息数据，字段包括 SOC(国家代码)、NAME_ENG(英文名称)、NAME_CHN(中文名称)等
      //     // 国家代码名称说明参考 https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json
      //     return 'rgba(255,255,255,1)';
      //   },
      // });
      // map.add(distWorld);
    }
  }, [data?.adcode, data?.cityCenter]);

  return (
    <div className='p-8 max-w-lg m-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号</FormLabel>
                <FormControl>
                  <Input placeholder='请输入手机号' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            提交
          </Button>
        </form>
      </Form>

      <Card className='mt-4'>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className='w-[100px] bg-slate-50 dark:bg-slate-800'>
                运营商
              </TableHead>
              <TableCell>
                {[data?.isp, data?.isoCode].join('/') || '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className='w-[100px] bg-slate-50 dark:bg-slate-800'>
                地区
              </TableHead>
              <TableCell>
                {[data?.provinceName, data?.cityName].join('/') || '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className='w-[100px] bg-slate-50 dark:bg-slate-800'>
                包含区域
              </TableHead>
              <TableCell>{data?.districts}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className='w-[100px] bg-slate-50 dark:bg-slate-800'>
                坐标
              </TableHead>
              <TableCell>{data?.cityCenter}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <div
        ref={mapRef}
        id='container'
        className='mt-4 w-full h-[200px] bg-slate-50 dark:bg-slate-800'
      ></div>
    </div>
  );
};
