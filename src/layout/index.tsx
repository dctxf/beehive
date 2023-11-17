import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { Link, Outlet } from 'react-router-dom';

export default () => {
  return (
    <div className=''>
      <div className='flex items-center justify-between w-full leading-3 px-4 py-2 bg-transparent backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-cyan-50 dark:shadow-cyan-900'>
        <div className='relative overflow-hidden rounded-full h-max w-max'>
          <div className='absolute inset-0 w-4 h-16 animate-slide'>
            <div
              aria-hidden='true'
              className='absolute inset-0 rotate-[-20deg] scale-y-125 bg-gradient-to-r from-transparent via-white/80 dark:via-white/10'
            ></div>
          </div>
          <div className='border relative border-blue-200 border-whit/50 inline-flex items-center p-0.5 px-2.5 rounded-full gap-x-2 border-gray-500/40 dark:border-white/30 bg-gray-950/10 dark:bg-white/10 before:scale-y-110 before:absolute before:inset-x-4 before:-bottom-px before:bg-gradient-to-r before:from-transparent before:via-yellow-50 before:to-transparent before:h-px before:w-3/5'>
            <Link to='/' title='Beehive 小工具集'>
              <span className='text-sm tracking-wide text-slate-600 dark:text-slate-50'>
                Beehive 小工具集
              </span>
            </Link>
          </div>
        </div>
        <ModeToggle></ModeToggle>
      </div>
      <div className='min-h-[calc(100vh-120px)] overflow-y-auto flex-1 bg-slate-100 dark:bg-slate-950'>
        <Outlet></Outlet>
      </div>
      <div className='h-[60px] border-t border-slate-200 dark:border-slate-700 flex items-center px-4 space-x-4 text-sm'>
        <div className='text-sm text-slate-500'>
          版权所有 © 2022 - {new Date().getFullYear()}{' '}
          <a href='https://dctxf.com' target='_blank'>
            dctxf.com
          </a>
        </div>
        <Separator orientation='vertical' />
        <div className='text-sm text-slate-500 dark:text-slate-400'>
          <a href='https://github.com/dctxf/beehive' target='_blank'>
            Github
          </a>
        </div>
      </div>
    </div>
  );
};
