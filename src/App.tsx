import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModeToggle } from './components/mode-toggle';
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
      <ModeToggle></ModeToggle>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
