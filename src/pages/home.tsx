import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

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
  {
    title: '每日一句英语',
    to: '/ciba',
    desc: '采用ciba接口，支持语音朗读',
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
