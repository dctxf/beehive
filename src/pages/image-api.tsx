import { Card, CardContent } from '@/components/ui/card';

const items = [
  {
    title: '夏沫博客',
    demos: [
      'https://cdn.seovx.com/?mom=302',
      'https://cdn.seovx.com/d/?mom=302',
      'https://cdn.seovx.com/ha/?mom=302',
      'https://cdn.seovx.com/ha/?mom=302&t=1',
    ],
    doc: 'https://cdn.seovx.com',
  },
  {
    title: 'imgapi',
    demos: [
      'https://imgapi.cn/api.php?fl=meizi&gs=images',
      'https://imgapi.cn/api.php?fl=dongman&gs=images',
      'https://imgapi.cn/api.php?fl=fengjing&gs=images',
      'https://imgapi.cn/api.php?fl=suiji&gs=images',
    ],
    doc: 'https://imgapi.cn',
  },
  {
    title: '岁月小筑',
    demos: [
      'https://img.xjh.me/random_img.php?return=302',
      'https://img.xjh.me/random_img.php?return=302&t=1',
      'https://img.xjh.me/random_img.php?return=302&t=2',
      'https://img.xjh.me/random_img.php?return=302&t=3',
    ],
    doc: 'https://img.xjh.me/',
  },
  {
    title: '樱花二次元图片API-Dmoe',
    demos: [
      'https://www.dmoe.cc/random.php?t=1',
      'https://www.dmoe.cc/random.php?t=2',
      'https://www.dmoe.cc/random.php?t=3',
      'https://www.dmoe.cc/random.php?t=4',
    ],
    doc: 'https://www.dmoe.cc',
  },
  {
    title: 'Lorem Picsum',
    demos: [
      'https://picsum.photos/200/200?random&t=1',
      'https://picsum.photos/200/200?random&t=2',
      'https://picsum.photos/200/200?random&t=3',
      'https://picsum.photos/200/200?random&t=4',
    ],
    doc: 'https://picsum.photos/',
  },
  {
    title: 'Unsplash Image API',
    demos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/user/erondu/200x200',
      'https://source.unsplash.com/random?t=1',
      'https://source.unsplash.com/random?t=2',
    ],
    doc: 'https://source.unsplash.com/',
  },
];

export default () => {
  return (
    <div className='p-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
      {items.map((i) => {
        return (
          <Card
            key={i.title}
            className='flex flex-col backdrop-blur-md bg-white/80 dark:bg-slate-800/80 rounded-lg overflow-hidden'
          >
            <div className='border-b border-slate-200 dark:border-slate-800 py-2 px-4 flex justify-between items-center'>
              <div className='text-lg'>{i.title}</div>
              <a
                href={i.doc}
                target='_blank'
                className='text-blue-500 text-xs'
                title={i.doc}
              >
                查看文档
              </a>
            </div>
            <CardContent className='text-sm grid grid-cols-4 gap-1 flex-1 p-4'>
              {i.demos.map((demo) => {
                return (
                  <div key={demo} className=''>
                    <img
                      src={demo}
                      className='whitespace-pre-wrap text-xs w-full h-[100px] object-cover'
                      alt={demo}
                    ></img>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
