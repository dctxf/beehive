import { Card, CardContent } from '@/components/ui/card';

const items = [
  {
    title: '夏沫博客',
    demos: [
      'https://cdn.seovx.com/?mom=302',
      'https://cdn.seovx.com/d/?mom=302',
      'https://cdn.seovx.com/ha/?mom=302',
    ],
    doc: '',
  },
  {
    title: 'imgapi',
    demos: ['https://imgapi.cn/bing.php'],
    doc: 'https://imgapi.cn',
  },
  {
    title: '岁月小筑',
    demos: [
      'https://img.xjh.me/random_img.php',
      'https://img.xjh.me/random_img.php?return=json',
      'https://img.xjh.me/random_img.php?return=302',
    ],
    doc: 'https://img.xjh.me/',
  },
  {
    title: '樱花二次元图片API-Dmoe',
    demos: ['https://www.dmoe.cc/random.php'],
    doc: 'https://www.dmoe.cc',
  },
  {
    title: '保罗｜API',
    demos: ['https://api.paugram.com/wallpaper/'],
    doc: 'https://api.paugram.com',
  },
  {
    title: 'Lorem Picsum',
    demos: ['https://unsplash.it/1600/900?random'],
    doc: 'https://picsum.photos/',
  },
  {
    title: 'Unsplash Image API',
    demos: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/user/erondu/1600x900',
      'https://source.unsplash.com/user/tkirkgoz/1600x900',
    ],
    doc: 'https://source.unsplash.com/',
  },
];

export default () => {
  return (
    <div
      className='p-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3 h-full'
      style={{
        backgroundImage: `url("https://unsplash.it/1600/900?random")`,
        backdropFilter: 'blur(10px)',
      }}
    >
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
            <CardContent className='text-sm flex-1 p-4'>
              {i.demos.map((demo) => {
                return (
                  <div key={demo} className='leading-6'>
                    <a
                      href={demo}
                      target='_blank'
                      className='whitespace-pre-wrap text-xs'
                      title={demo}
                    >
                      {demo}
                    </a>
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
