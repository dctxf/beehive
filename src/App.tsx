import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import Ciba from './pages/ciba';
import Home from './pages/home';
import Jieba from './pages/jieba';
import PhoneLocation from './pages/phone-location';
import Poetry from './pages/poetry';

const router = createBrowserRouter([
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
