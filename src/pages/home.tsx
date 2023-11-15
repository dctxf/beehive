import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Item: FC<{ title: React.ReactNode; to: string }> = ({ title, to }) => {
  return (
    <li className='sm:w-full md:w-1/2 xl:w-1/4'>
      <Link
        to={to}
        className='p-4 text-blue-500 bg-slate-50 hover:bg-slate-100 block'
      >
        {title}
      </Link>
    </li>
  );
};

const items = [
  {
    title: '古诗古词',
    to: '/poetry',
    desc: '采用了唐诗、宋词、元曲、明代诗词、现代诗词等诗歌数据。支持语音朗读，拼音标注',
  },
  {
    title: '分词',
    to: '/jieba',
    desc: '采用中文分词库jieba，开源免费。',
  },
];

export default () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <ul className='w-full'>
        {items.map((item) => (
          <Link to={item.to} key={item.title}>
            <Card className='mb-2'>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
};
