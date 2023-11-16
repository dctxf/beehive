import classNames from 'classnames';
import { FC } from 'react';
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
  {
    title: '手机号归属地',
    to: '/phone/location',
    desc: '查询手机号归属地',
  },
];

export const ToolsCard: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames('grid gap-1 p-4', className)}>
      {items.map((item) => (
        <Link
          to={item.to}
          key={item.title}
          className={classNames(
            'hover:bg-slate-50 dark:hover:bg-slate-900 p-3 rounded-sm'
          )}
        >
          <div className=''>
            <div className='text-base font-bold text-slate-600 dark:text-slate-200'>
              {item.title}
            </div>
            <div className='text-xs text-slate-500 dark:text-slate-600'>
              {item.desc}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
