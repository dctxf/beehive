import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModeToggle } from './components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './components/ui/navigation-menu';
import Home from './pages/home';
import Jieba from './pages/jieba';
import Poetry from './pages/poetry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/poetry',
    element: <Poetry></Poetry>,
  },
  {
    path: '/jieba',
    element: <Jieba></Jieba>,
  },
]);

function App() {
  return (
    <>
      <div className='flex items-center justify-between w-full leading-3 px-4 py-2 bg-slate-50 dark:bg-slate-800'>
        <div>
          <a href='/' title='Beehive 小工具集'>
            Beehive 小工具集
          </a>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>工具集</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <NavigationMenuLink>
                    <a href='/poetry'>诗歌生成</a>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <a href='/jieba'>中文分词</a>
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle></ModeToggle>
      </div>
      <div className='min-h-[calc(100vh-120px)]'>
        <RouterProvider router={router}></RouterProvider>
      </div>
      <div className='h-[60px] border-t border-slate-200 dark:border-slate-700 flex items-center justify-center'>
        <div className='text-sm text-slate-500'>
          版权所有 © 2022 - {new Date().getFullYear()}{' '}
          <a href='https://dctxf.com' target='_blank'>
            dctxf.com
          </a>
        </div>
        <div className='mx-2 text-slate-500 dark:text-slate-400'>|</div>
        <div className='text-sm text-slate-500 dark:text-slate-400'>
          <a href='https://github.com/dctxf/beehive' target='_blank'>
            Github
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
