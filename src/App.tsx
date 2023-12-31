import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import Ciba from './pages/ciba';
import Home from './pages/home';
import ImageApi from './pages/image-api';
import Jieba from './pages/jieba';
import PhoneLocation from './pages/phone-location';
import Poetry from './pages/poetry';
import Tts from './pages/tts';

const router = createHashRouter([
  {
    path: '',
    element: <Layout></Layout>,
    children: [
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
      {
        path: '/ciba',
        element: <Ciba></Ciba>,
      },
      {
        path: '/phone/location',
        element: <PhoneLocation></PhoneLocation>,
      },
      {
        path: '/image/api',
        element: <ImageApi></ImageApi>,
      },
      {
        path: '/tts',
        element: <Tts></Tts>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
