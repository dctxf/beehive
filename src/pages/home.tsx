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

export default () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center p-4'>
      <h1 className='text-3xl mb-4'>Beehive 小工具集</h1>
      <ul className='w-full flex flex-wrap'>
        <Item title='古诗古词' to='/poetry'></Item>
        <Item title='分词' to='/jieba'></Item>
      </ul>
    </div>
  );
};
